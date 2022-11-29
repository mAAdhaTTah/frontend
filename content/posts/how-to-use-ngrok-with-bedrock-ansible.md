---
title: How to Use ngrok with Bedrock-Ansible
publishedAt: '2015-03-07T21:08:15.000Z'
updatedAt: '2015-04-18T23:31:13.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      Now is a pretty awesome time to be getting into web development. With
      [Node](http://nodejs.org/) blowing up in popularity, and the PHP world
      rallying around [composer](https://getcomposer.org/), the tooling
      available for web development are getting really quite cool these days.
      Because of its legacy status, WordPress is still a bit behind the times on
      these things, but there are developers trying to bring these practices
      into WordPress development, and I've been really excited to follow the
      work done by the [Roots](http://roots.io) team. I've been using
      [bedrock](https://github.com/roots/bedrock) and its Vagrant setup
      counterpart, [bedrock-ansible](https://github.com/roots/bedrock-ansible),
      for pretty much all my projects now.


      I've been working on [WordPress-GitHub
      Sync](https://github.com/benbalter/wordpress-github-sync) lately, which
      required testing GitHub's Webhooks with the plugin. As [suggested by
      GitHub](https://developer.github.com/webhooks/configuring/), I used ngrok
      to test this set up, but it required some manual work every time I wanted
      to do it.


      Because the Vagrant box is set up with Ansible, you can set it up to do
      all that manual work for you. This tutorial will show you how to integrate
      `ansible-ngrok` into your local bedrock-ansible development environment.


      ## Walkthrough


      To start, I'm going to assume you have a bedrock-ansible development
      environment that is set up and working. If you don't, check out the
      [documentation](https://github.com/roots/bedrock-ansible/blob/master/README.md).


      Setting up ngrok is as easy as adding a few lines to your current
      configuration. First, add this line to `requirements.yml`:


      ```

      -- name: ngrok
        src: mAAdhaTTah.ngrok
      ```


      Next, add this line to your `dev.yml` file:


      ```

      -- { role: ngrok, tags: [ngrok] }

      ```


      Finally, edit your `group_vars/development` file to include this line:


      ```

      ngrok:
        subdomain: domain
        token: your_token
      ```


      Where `domain` will become `domain.ngrok.com` for your site, and
      `your_token` is the auth token found on your
      [dashboard](https://ngrok.com/dashboard). This isn't required for ngrok,
      per se, but is required if you want to set a hostname, which you will need
      for WordPress.


      Lastly, you need to change `site_name`, `site_url`, `wp_home`, and
      `wp_siteurl` from whatever local url you've been using to
      `domain.ngrok.com`, again, where `domain` is the subdomain set above.


      Once you've done that, run `ansible-galaxy install -r requirements.yml -p
      vendor/roles --ignore-errors` to install ngrok from ansible-galaxy. Before
      running `vagrant up`, add `config.vm.network "public_network"` under
      `config.vm.network :private_network, ip: '192.168.50.5'` in your
      `Vagrantfile`. After the Vagrant box is completely provisioned, ssh into
      the box (`vagrant ssh`) and run `ngrok`, and the ngrok client will begin
      running at the set url.


      Open that url in your browser, and you're all set! Now you can show your
      local development environment to clients and test webhooks with ease.
    _template: richText
excerpt: >
  Now is a pretty awesome time to be getting into web development. With Node
  blowing up in popularity, and the PHP world rallying around composer, the
  tooling available for web development are getting really quite cool these
  days. Because of its legacy status, WordPress is still a bit behind the times
  on these things, but \[…]
featuredMedia: content/media/get-it-its-a-tunnel.md
_template: standard
---

