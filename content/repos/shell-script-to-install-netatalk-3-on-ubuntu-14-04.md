---
description: Shell script to install Netatalk 3 on Ubuntu 14.04
status: publish
gistId: none
sync: false
createdAt: '2015-11-17T12:37:29.000Z'
updatedAt: '2015-11-17T12:37:29.000Z'
blobs:
  - filename: 1_netatalk-3-install-on-ubuntu-14.04.sh
    code: >-
      # Get root:


      sudo su


      # Install prerequisites:


      apt-get install build-essential pkg-config checkinstall git avahi-daemon
      libavahi-client-dev libcrack2-dev libwrap0-dev autotools-dev automake
      libtool libdb-dev libacl1-dev libdb5.1-dev db-util db5.1-util libgcrypt11
      libgcrypt11-dev


      # Build libevent from source:

      cd /usr/local/src

      wget
      https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz

      tar xfv libevent-2.0.21-stable.tar.gz

      cd libevent-2.0.21-stable

      ./configure
       make
      checkinstall --pkgname=libevent-2.0.21-stable --pkgversion="$(date
      +%Y%m%d%H%M)" --backup=no --deldoc=yes --default --fstrans=no

      cd ../


      # Download src:

      git clone git://git.code.sf.net/p/netatalk/code netatalk-code

      cd netatalk-code

      ./bootstrap


      # Configure install


      ./configure --enable-debian --enable-zeroconf --with-cracklib --with-acls
      --enable-tcp-wrappers --with-init-style=debian

      make


      # Build!


      checkinstall --pkgname=netatalk --pkgversion="$(date +%Y%m%d%H%M)"
      --backup=no --deldoc=yes --default --fstrans=no


      # Config is in /usr/local/etc/afp.conf
    language: bash
  - filename: 2_netatalk-3-afp.conf
    code: |-
      ;/usr/local/etc/afp.conf
      ; Netatalk 3.x configuration file
      ;
       
      [Global]
      ; Global server settings
      vol preset = default_for_all_vol
      hostname = TimeCapsule
      log file = /var/log/netatalk.log
      log level = default:info
      uam list = uams_dhx.so,uams_dhx2.so
      save password = no
      disconnect time = 168
      dsireadbuf = 96
      sleep time = 24
      tcprcvbuf = 524288
      tcpsndbuf = 524288
      dircachesize = 131072
      keep sessions = yes
      mimic model = Xserve
       
      [default_for_all_vol]
      file perm = 0664
      directory perm = 0774
      ;cnid scheme = cbd
      valid users = @tm
       
      [Homes]
      basedir regex = /home
      cnid scheme = dbd
      home name = Home: $u
       
      [TimeMachine]
      path = /home/tm
      time machine = yes
      ;vol size limit = 953674
    language: ini
---

