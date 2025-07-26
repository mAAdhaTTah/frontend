---
tags:
  - web
  - essay
title: A Better WordPress Singleton
description: "If you look at any WordPress plugin of significant size, you’ll probably find most of them boot the same way. From BuddyPress, to PressForward, to JetPack, all of these boot the same way: with singletons. JetPack in particular is interesting, as many of its modules are also singletons themselves. It’s an extremely common pattern in \\[…]"
slug: writing/a-better-wordpress-singleton
published_at: 2015-08-06T14:30:40.000Z
updated_at: 2015-08-07T16:14:23.000Z
excerpt: "If you look at any WordPress plugin of significant size, you’ll probably find most of them boot the same way. From BuddyPress, to PressForward, to JetPack, all of these boot the same way: with singletons. JetPack in particular is interesting, as many of its modules are also singletons themselves. It’s an extremely common pattern in \\[…]"
featuredMedia: ""
share: true
---

If you look at any WordPress plugin of significant size, you'll probably find most of them boot the same way. From [BuddyPress](https://github.com/buddypress/BuddyPress/blob/master/src/bp-loader.php#L134-L153), to [PressForward](https://github.com/PressForward/pressforward/blob/master/pressforward.php#L54-L62), to [JetPack](https://github.com/Automattic/jetpack/blob/master/class.jetpack.php#L291-L307), all of these boot the same way: with singletons. JetPack in particular is interesting, as many of its modules are [also](https://github.com/Automattic/jetpack/blob/master/modules/markdown/easy-markdown.php#L54-L58) [singletons](https://github.com/Automattic/jetpack/blob/master/class.jetpack-admin.php#L17-L22) [themselves](https://github.com/Automattic/jetpack/blob/master/modules/custom-post-types/portfolios.php#L21-L29). It's an extremely common pattern in WordPress plugin development, wrapping the main plugin class in a singleton and instantiating it through a static method, which then enforces only a single instance of the class exists and _can ever exist_. The prototypical example looks like this in PHP:

!gistpens/a-better-wordpress-singleton

Note the `protected` constructor: This means that the class can only be instantiated by itself (in this case, by the static `init` method), so no other code can create a new instance of the class. That same `init` method saves the . The second time, the instance already exists statically and is returned directly.

Singletons are generally an [anti-pattern](http://stackoverflow.com/questions/12755539/why-is-singleton-considered-an-anti-pattern) in wider object-oriented development. The biggest issue is if you ever find yourself needing two instances of the object, you're screwed; it'll take a ton of refactoring to undo all the locations in which the singleton static method is called.

Singletons are generally much worse in other languages, like Java, where the application is long-running and there is a shared memory space. The drawbacks often encountered in those languages are not encountered in PHP, with its stateless, single-thread, fire-and-die approach to web development.

Even though I'm a big fan of WordPress generally, it's full of anti-patterns (_omg the globals!_), so I'm not really that bothered by the idea of plugin developers adding another one onto the heap, and in this case, it actually solves a lot more problems than it causes because in WordPress, you don't want multiple instance of your main plugin class floating about. However, the singleton pattern does still have an issue in WordPress:

_You've completely locked yourself off from your constructor._

This generally isn't a huge issue in WordPress plugins, as most plugins don't do any kind of unit testing, but if you're interested in doing unit testing and your main plugin class has any dependencies at all, being unable to access your constructor means you're unable to mock any of those dependencies, or pass in anything at all.

I've spent a little bit of time playing around with Laravel, Pimple, and some of the other dependency injection containers out in the wider PHP world, because I wanted to more effectively unit test my plugins, and in addition to the singleton pattern, many of those main singleton classes also function effectively as containers as well. [PressForward](https://github.com/PressForward/pressforward/blob/master/pressforward.php#L77-L91) sets up all its dependencies there and uses them throughout the application, so I wanted to build something that fits with the pattern many WordPress plugin developers are already familiar with. That means the main application container class should be a singleton.

Instead of through static methods, you can enforce the class's _singleton-ness_ the class's constructor:

!gistpens/a-better-wordpress-singleton

Now, if an instance already exists, an Exception is thrown, so another developer would not be able to instantiate a new instance of the main plugin class. The constructor its is now exposed, so any dependencies, even if it's just the boot file location, can be passed into the main class, and the class's singleton-ness is still maintained.

Now, you might think you just throw `$app = new PluginClass(__FILE__);` into your main plugin file and you're good to go, but you'd be wrong. We're doing all this work to minimize the number of global variables, so that would be a bad idea. You could wrap it in a function so no global variables are leaked, but then you've added a global function (less of a problem, but still a problem). So there's one more trick I'd like to share:

!gistpens/a-better-wordpress-singleton

This was pulled from a suggestion in a pull request on the [WordPress Plugin Boilerplate](https://github.com/DevinVinson/WordPress-Plugin-Boilerplate/pull/321), so I can't claim credit for it, but it is a great way of solving the global problem. Now, the class is instantiated, its boot method is run, access to its constructor is preserved, no globals are leaked, and you still enforce it as a singleton.

This singleton design is implemented in the WordPress plugin framework I'm building, [jaxion](https://github.com/intraxia/jaxion), so you can see the current implementation [here](https://github.com/intraxia/jaxion/blob/master/src/Core/Application.php). The boot method will be the default startup for [jaxion-boostrap](https://github.com/intraxia/jaxion-bootstrap/blob/master/plugin-name.php#L34-L38), the plugin boilerplate built on jaxion. You can see the current implementation [here](https://github.com/intraxia/jaxion-bootstrap/blob/master/plugin-name.php#L34-L38).

What do you think? Will you start using this singleton pattern in your WordPress plugins?
