---
description: Sync additional paths in Bedrock-Ansible's Vagrantfile
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:35:12.000Z'
updatedAt: '2015-02-14T18:35:12.000Z'
blobs:
  - filename: vagrantfile
    code: |-
      # Sync additional paths
      extra_paths = [
        ['../../../plugins/wp-gistpen', File.join(bedrock_path_server, 'web/app/plugins/wp-gistpen')]
      ]

      extra_paths.each do |paths|
        extra_path = paths[0]
        extra_path_server = paths[1]
        initial_mount = File.join('/wptmp', File.basename(extra_path))

        if Vagrant::Util::Platform.windows?
          config.vm.synced_folder extra_path, extra_path_server, owner: 'vagrant', group: 'www-data', mount_options: ['dmode=776', 'fmode=775']
        else
          if !Vagrant.has_plugin? 'vagrant-bindfs'
            raise Vagrant::Errors::VagrantError.new,
              "vagrant-bindfs missing, please install the plugin:\nvagrant plugin install vagrant-bindfs"
          else
            config.vm.synced_folder extra_path, initial_mount, type: 'nfs'
            config.bindfs.bind_folder initial_mount, extra_path_server, u: 'vagrant', g: 'www-data'
          end
        end
      end
    language: ruby
---

