---
title: Installing btrfs as boot drive on Ubuntu 14.04
publishedAt: '2014-06-25T18:00:09.000Z'
updatedAt: '2014-07-28T13:41:15.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I recently upgraded my home server; it was previously running Ubuntu
      12.04, but it was kind of a mess. I had a 1TB internal drive with 3
      separate external drives, running on a [HP ProLiant G7 N54L
      MicroServer](http://www.newegg.com/Product/Product.aspx?Item=59-107-921).
      I wanted to accomplish a few things in one fell swoop:


      1. Upgrade to Ubuntu 14.04 LTS.

      2. Switch to a RAID1<FootnoteReference id="1" /> set up with btrfs.

      3. Rearrange my directory set up more logically.


      One of the interesting things about btrfs is you can convert an ext4
      filesystem to btrfs non-destructively. btrfs maintains a subvolume with
      the old ext4 data that you can revert to if something goes wrong.
      Additionally, you can change RAID levels on a live system without any
      downtime, as well as add or remove drives to your array that way as well.


      So after doing some research, I decided I had two options:


      1. Upgrade my current system to 14.04, convert the ext4 filesystem to
      btrfs, add 2 4TB drives, convert to RAID1 and balance the data, rearrange
      the directory structure, and remove the original 1TB drive.

         Reason I didn't go with this: I had some concerns about upgrading to 12.04 "live", which is required because btrfs wasn't available in that version.<FootnoteReference id="2" /> I wouldn't have any backup or way to revert to my old system if something went wrong. Additionally, I had some software installed on my old system that I didn't really need (MySQL, Apache, plus some drivers for scanners and other things), and a clean install would give me a chance to wipe and reconfigure everything over again.
      2. Clean install 14.04 and reinstall/reconfigure everything

         This would take a heckuva lot longer than the first option, but would leave me with a new clean setup after I was finished.

      # Installation Process


      ## Step 1


      Start off by installing Ubuntu 14.04 Server the normal way, with a normal
      partition structure. A lot of places suggest separating out the `/boot`
      partition, but this is no longer necessary. The standard installer will
      install GRUB to the MBR, so we can boot from there without an issue.


      I left off all the software except OpenSSH when I got to the `tasksel`
      step. Feel free to do what you'd like there.


      ## Step 2


      Once installed, boot into the system and make sure everything is working
      as expected. Run `sudo apt-get update && sudo apt-get upgrade` to make
      sure your software is updated completely. You'll probably have to reboot
      afterwards.


      ## Step 3


      Boot from a LiveCD and follow [these
      instructions](https://help.ubuntu.com/community/btrfs#Converting_Ubuntu_12.10_ext4_root_filesystem)
      to convert the ext4 system you currently have to a btrfs system. The only
      thing you should note is the line you prepend with the hash looks a little
      different:


      ```shell

      if [ -n "\${have_grubenv}" ]; then if [ -z "\${boot_once}" ]; then save_env recordfail; fi; fi

      ```


      ## Step 4


      After you've converted to btrfs, boot up. Fingers crossed, everything
      should boot fine. I ran into an issue where I updated my Linux headers
      after booting and grub was giving me issues. I had to rerun `grub-install`
      and `update-grub` before it would boot properly.


      ## Step 5


      To add the second drive, run the same commands to partition the whole
      drive as btrfs, then run `sudo fdisk -l` to get the device name. In my
      case, it was `/dev/sdb`, so you'll see that used in the commands below.
      **Make sure you sub out your device name.**


      ```shell

      sudo btrfs device add /dev/sdb /

      sudo btrfs filesystem show /

      ```


      You'll get this result:


      ```shell

      Label: none  uuid: 2b182d08-ae86-423c-8825-22f10554fdca

      Total devices 2 FS bytes used 60.68GiB

      devid    1 size 3.64TiB used 3.64TiB path /dev/sda2

      devid    2 size 3.64TiB used 0.00 path /dev/sdb


      Btrfs v3.12    

      ```


      I don't know why it shows up as full after the initial mount, but that
      problem was fixed when I ran the balance command.


      I also fiddled with getting them to mount correctly before successfully
      adding it to the root drive. A lot of tutorials keep telling you to add to
      /mnt, but don't listen to them -- we're using it as our main drive so add
      to `/`.


      After its been added, balance the drives:


      ```shell

      sudo btrfs balance start -dconvert=raid1 -mconvert=raid1 /

      ```


      `dconvert` converts the data stories to RAID1, `mconvert` manages the
      metadata.


      The balance command is where a lot of the magic happens. btrfs is able to
      rearrange the data into whatever setup you'd like.


      Converts to:


      ```shell

      dreedle@pianosa:~$ sudo btrfs fi show /

      Label: none  uuid: 2b182d08-ae86-423c-8825-22f10554fdca

      Total devices 2 FS bytes used 59.97GiB

      devid    1 size 3.64TiB used 62.03GiB path /dev/sda2

      devid    2 size 3.64TiB used 62.03GiB path /dev/sdb


      Btrfs v3.12

      ```


      <FootnoteDefinition id="1">
        Currently, btrfs doesn't completely support RAID5/6, plus I only had two drives to work with, RAID1 was pretty much the only option. I could have gone with RAID0 for more space, but the point of switching to this set up was the redundancy, not the space, though I did end up with more space after I consolidated everything.
      </FootnoteDefinition>


      <FootnoteDefinition id="2">
        This is actually one of the big pluses of btrfs: for future upgrades, I can take a snapshot of the drive as it stands now, upgrade to 14.10 (whenever it arrives), and it if doesn't work, I can boot from the snapshot, and it's like nothing ever happened.
      </FootnoteDefinition>
    _template: richText
excerpt: >
  I recently upgraded my home server; it was previously running Ubuntu 12.04,
  but it was kind of a mess. I had a 1TB internal drive with 3 separate external
  drives, running on a HP ProLiant G7 N54L MicroServer. I wanted to accomplish a
  few things in one fell swoop: Upgrade to Ubuntu 14.04 LTS. Switch \[…]
featuredMedia: content/media/btrfs_logo2.md
categories:
  - reference: content/categories/technology.md
_template: standard
---
