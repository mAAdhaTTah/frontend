---
description: Trellis Gatsby Configuration
status: publish
gistId: ''
sync: false
createdAt: '2018-11-04T19:24:52.000Z'
updatedAt: '2018-11-05T08:08:03.000Z'
blobs:
  - filename: deploy-hooks/build-before.yml
    code: >-
      diff --git a/deploy-hooks/build-before.yml b/deploy-hooks/build-before.yml

      --- a/deploy-hooks/build-before.yml

      +++ b/deploy-hooks/build-before.yml

      +- name: Install npm dependencies

      +  command: npm ci

      +  connection: local

      +  args:

      +    chdir: "~/path/to/gatsby"

      +

      +- name: Compile assets for production

      +  command: npm run build

      +  connection: local

      +  args:

      +    chdir: "~/path/to/gatsby"

      +

      +- name: Copy production assets

      +  synchronize:

      +    src: "~/path/to/gatsby/public"

      +    dest: "{{ deploy_helper.new_release_path }}"

      +    group: no

      +    owner: no

      +    rsync_opts:
      --chmod=Du=rwx,--chmod=Dg=rx,--chmod=Do=rx,--chmod=Fu=rw,--chmod=Fg=r,--chmod=Fo=r
    language: git
  - filename: group_vars/development/wordpress_sites.yml
    code: >-
      diff --git a/group_vars/development/wordpress_sites.yml
      b/group_vars/development/wordpress_sites.yml

      --- a/group_vars/development/wordpress_sites.yml

      +++ b/group_vars/development/wordpress_sites.yml

      @@ -8,6 +8,7 @@ wordpress_sites:
             - canonical: domain.test
           local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
           admin_email: admin@domain.test
      +    nginx_wordpress_site_conf: templates/domain.com.conf.j2
           multisite:
             enabled: false
           ssl:
      diff --git a/group_vars/production/wordpress_sites.yml
      b/group_vars/production/wordpress_sites.yml

      index 48b69b9..99d775f 100644

      --- a/group_vars/production/wordpress_sites.yml

      +++ b/group_vars/production/wordpress_sites.yml

      @@ -9,6 +9,7 @@ wordpress_sites:
           local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
           repo: git@bitbucket.org:repo/domain.git # replace with your Git repo URL
           branch: master
      +    nginx_wordpress_site_conf: templates/domain.com.conf.j2
           multisite:
             enabled: false
           ssl:
    language: git
  - filename: templates/wordpress-site.conf.j2
    code: >-
      diff --git a/templates/domain.com.conf.j2 b/templates/domain.com.conf.j2

      +++ b/templates/domain.com.conf.j2

      +{% extends 'roles/wordpress-setup/templates/domain.com.conf.j2' %}

      +

      +{% block location_primary -%}

      +location /wp-json {

      +    try_files $uri $uri/ /index.php?$args;

      +  }

      +  location /wp/ {

      +    try_files $uri $uri/ /wp/wp-admin/;

      +  }

      +  location / {

      +    root       {{ www_root }}/{{ item.key }}/{{ item.value.current_path |
      default('current') }}/public;

      +    error_page 404 /404.html;

      +  }

      +{% endblock %}
    language: git
commits:
  - committedAt: '2018-11-05T13:08:03.000Z'
    description: Trellis Gatsby Configuration
    blobs:
      - filename: deploy-hooks/build-before.yml
        code: >-
          diff --git a/deploy-hooks/build-before.yml
          b/deploy-hooks/build-before.yml

          --- a/deploy-hooks/build-before.yml

          +++ b/deploy-hooks/build-before.yml

          +- name: Install npm dependencies

          +  command: npm ci

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Compile assets for production

          +  command: npm run build

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Copy production assets

          +  synchronize:

          +    src: "~/path/to/gatsby/public"

          +    dest: "{{ deploy_helper.new_release_path }}"

          +    group: no

          +    owner: no

          +    rsync_opts:
          --chmod=Du=rwx,--chmod=Dg=rx,--chmod=Do=rx,--chmod=Fu=rw,--chmod=Fg=r,--chmod=Fo=r
        language: git
      - filename: group_vars/development/wordpress_sites.yml
        code: >-
          diff --git a/group_vars/development/wordpress_sites.yml
          b/group_vars/development/wordpress_sites.yml

          --- a/group_vars/development/wordpress_sites.yml

          +++ b/group_vars/development/wordpress_sites.yml

          @@ -8,6 +8,7 @@ wordpress_sites:
                 - canonical: domain.test
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               admin_email: admin@domain.test
          +    nginx_wordpress_site_conf: templates/domain.com.conf.j2
               multisite:
                 enabled: false
               ssl:
          diff --git a/group_vars/production/wordpress_sites.yml
          b/group_vars/production/wordpress_sites.yml

          index 48b69b9..99d775f 100644

          --- a/group_vars/production/wordpress_sites.yml

          +++ b/group_vars/production/wordpress_sites.yml

          @@ -9,6 +9,7 @@ wordpress_sites:
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               repo: git@bitbucket.org:repo/domain.git # replace with your Git repo URL
               branch: master
          +    nginx_wordpress_site_conf: templates/domain.com.conf.j2
               multisite:
                 enabled: false
               ssl:
        language: git
      - filename: templates/wordpress-site.conf.j2
        code: >-
          diff --git a/templates/domain.com.conf.j2
          b/templates/domain.com.conf.j2

          +++ b/templates/domain.com.conf.j2

          +{% extends 'roles/wordpress-setup/templates/domain.com.conf.j2' %}

          +

          +{% block location_primary -%}

          +location /wp-json {

          +    try_files $uri $uri/ /index.php?$args;

          +  }

          +  location /wp/ {

          +    try_files $uri $uri/ /wp/wp-admin/;

          +  }

          +  location / {

          +    root       {{ www_root }}/{{ item.key }}/{{
          item.value.current_path | default('current') }}/public;

          +    error_page 404 /404.html;

          +  }

          +{% endblock %}
        language: git
  - committedAt: '2018-11-05T00:32:43.000Z'
    description: Trellis Gatsby Configuration
    blobs:
      - filename: deploy-hooks/build-before.yml
        code: >-
          diff --git a/deploy-hooks/build-before.yml
          b/deploy-hooks/build-before.yml

          --- a/deploy-hooks/build-before.yml

          +++ b/deploy-hooks/build-before.yml

          +- name: Install npm dependencies

          +  command: npm ci

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Compile assets for production

          +  command: npm run build

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Copy production assets

          +  synchronize:

          +    src: "~/path/to/gatsby/public"

          +    dest: "{{ deploy_helper.new_release_path }}"

          +    group: no

          +    owner: no

          +    rsync_opts:
          --chmod=Du=rwx,--chmod=Dg=rx,--chmod=Do=rx,--chmod=Fu=rw,--chmod=Fg=r,--chmod=Fo=r
        language: git
      - filename: group_vars/development/wordpress_sites.yml
        code: >-
          diff --git a/group_vars/development/wordpress_sites.yml
          b/group_vars/development/wordpress_sites.yml

          --- a/group_vars/development/wordpress_sites.yml

          +++ b/group_vars/development/wordpress_sites.yml

          @@ -8,6 +8,7 @@ wordpress_sites:
                 - canonical: domain.test
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               admin_email: admin@domain.test
          +    nginx_wordpress_site_conf: templates/wordpress-site.conf.j2
               multisite:
                 enabled: false
               ssl:
          diff --git a/group_vars/production/wordpress_sites.yml
          b/group_vars/production/wordpress_sites.yml

          index 48b69b9..99d775f 100644

          --- a/group_vars/production/wordpress_sites.yml

          +++ b/group_vars/production/wordpress_sites.yml

          @@ -9,6 +9,7 @@ wordpress_sites:
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               repo: git@bitbucket.org:repo/domain.git # replace with your Git repo URL
               branch: master
          +    nginx_wordpress_site_conf: templates/wordpress-site.conf.j2
               multisite:
                 enabled: false
               ssl:
        language: git
      - filename: templates/wordpress-site.conf.j2
        code: >-
          diff --git a/templates/wordpress-site.conf.j2
          b/templates/wordpress-site.conf.j2

          +++ b/templates/wordpress-site.conf.j2

          +{% extends 'roles/wordpress-setup/templates/wordpress-site.conf.j2'
          %}

          +

          +{% block location_primary -%}

          +location /wp-json {

          +    try_files $uri $uri/ /index.php?$args;

          +  }

          +  location /wp/ {

          +    try_files $uri $uri/ /wp/wp-admin/;

          +  }

          +  location / {

          +    root       {{ www_root }}/{{ item.key }}/{{
          item.value.current_path | default('current') }}/public;

          +    error_page 404 /404.html;

          +  }

          +{% endblock %}
        language: git
  - committedAt: '2018-11-05T00:24:53.000Z'
    description: Trellis Gatsby Configuration
    blobs:
      - filename: deploy-hooks/build-before.yml
        code: >-
          diff --git a/deploy-hooks/build-before.yml
          b/deploy-hooks/build-before.yml

          --- a/deploy-hooks/build-before.yml

          +++ b/deploy-hooks/build-before.yml

          +- name: Install npm dependencies

          +  command: npm ci

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Compile assets for production

          +  command: npm run build

          +  connection: local

          +  args:

          +    chdir: "~/path/to/gatsby"

          +

          +- name: Copy production assets

          +  synchronize:

          +    src: "~/path/to/gatsby/public"

          +    dest: "{{ deploy_helper.new_release_path }}"

          +    group: no

          +    owner: no

          +    rsync_opts:
          --chmod=Du=rwx,--chmod=Dg=rx,--chmod=Do=rx,--chmod=Fu=rw,--chmod=Fg=r,--chmod=Fo=r
        language: git
      - filename: group_vars/development/wordpress_sites.yml
        code: >-
          diff --git a/group_vars/development/wordpress_sites.yml
          b/group_vars/development/wordpress_sites.yml

          --- a/group_vars/development/wordpress_sites.yml

          +++ b/group_vars/development/wordpress_sites.yml

          @@ -8,6 +8,7 @@ wordpress_sites:
                 - canonical: domain.test
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               admin_email: admin@domain.test
          +    nginx_wordpress_site_conf: templates/wordpress-site.conf.j2
               multisite:
                 enabled: false
               ssl:
          diff --git a/group_vars/production/wordpress_sites.yml
          b/group_vars/production/wordpress_sites.yml

          index 48b69b9..99d775f 100644

          --- a/group_vars/production/wordpress_sites.yml

          +++ b/group_vars/production/wordpress_sites.yml

          @@ -9,6 +9,7 @@ wordpress_sites:
               local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
               repo: git@bitbucket.org:repo/domain.git # replace with your Git repo URL
               branch: master
          +    nginx_wordpress_site_conf: templates/wordpress-site.conf.j2
               multisite:
                 enabled: false
               ssl:
        language: git
      - filename: templates/wordpress-site.conf.j2
        code: >-
          diff --git a/templates/wordpress-site.conf.j2
          b/templates/wordpress-site.conf.j2

          +++ b/templates/wordpress-site.conf.j2

          +{% extends 'roles/wordpress-setup/templates/wordpress-site.conf.j2'
          %}

          +

          +{% block location_primary -%}

          +location /wp-json/ {

          +    try_files $uri $uri/ /index.php?$args;

          +  }

          +  location /wp/ {

          +    try_files $uri $uri/ /wp/wp-admin/;

          +  }

          +  location / {

          +    root       {{ www_root }}/{{ item.key }}/{{
          item.value.current_path | default('current') }}/public;

          +    error_page 404 /404.html;

          +  }

          +{% endblock %}
        language: git
---

