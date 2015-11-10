VAGRANT_API_VERSION = '2'

required_plugins = %w( vagrant-hostmanager vagrant-vbguest vagrant-triggers )
required_plugins.each do |plugin|
   exec "vagrant plugin install #{plugin};vagrant #{ARGV.join(" ")}" unless Vagrant.has_plugin? plugin || ARGV[0] == 'plugin'
end

Vagrant.configure(VAGRANT_API_VERSION) do |config|
   config.vm.box = 'centos/7'

   # Setting the `insert_key` to false prevents vagrant from generating a private key. 
   # This allows us to point our development Ansible inventory at the common, insecure key. 
   # This isn't really an issue as this VM is for development only
   config.ssh.insert_key = false

   # Hostmanager config
   #   - enable hostmanager on all VMs
   #   - use the private IP of the VM for communication
   #   - add an entry to the hosts file for the VM on the host
   config.hostmanager.enabled           = true
   config.hostmanager.manage_host       = true
   config.hostmanager.ignore_private_ip = false
   config.hostmanager.include_offline   = true

   # Install Guest Additions using our custom class
   config.vbguest.installer = RedHatGuestAdditionsInstaller

   # VirtualBox configuration
   config.vm.provider :virtualbox do |vb|
      vb.customize [ 'modifyvm', :id, '--memory', 512 ]
      vb.customize [ 'modifyvm', :id, '--cpus', 2 ]
      vb.customize [ 'modifyvm', :id, '--natdnshostresolver1', 'on' ]
      vb.customize [ 'modifyvm', :id, '--ioapic', 'on' ]
      vb.customize [ 'modifyvm', :id, '--ostype', 'RedHat_64' ]
      vb.name = "jenkins-mirage"
   end

   config.vm.hostname = 'jenkins.mirage.dev'
   config.vm.network :private_network, ip: '192.168.111.222'

   config.vm.synced_folder './build', '/var/lib/jenkins/userContent', :create => true, :type => 'nfs', mount_options: ['actimeo=1']

   config.vm.provision :trigger do |trigger|
      trigger.fire do
         run 'ansible-galaxy install -r vagrant/role-requirements.yml -f'
      end
   end

   config.vm.provision :ansible do |ansible|
      ansible.playbook = 'vagrant/configure.yml'
      ansible.verbose = false
      ansible.extra_vars = {
         :ansible_ssh_user => 'vagrant',
         :ansible_ssh_private_key_file => '~/.vagrant.d/insecure_private_key',
      }
   end
end

# We need to define a custom class with the install method so we can install
# pre-requisite packages before we try and install Guest Additions
class RedHatGuestAdditionsInstaller < VagrantVbguest::Installers::Linux
   def install(opts = nil, &block)
      communicate.sudo 'yum install -y kernel-devel-`uname -r` gcc make perl bzip2', opts, &block

      super
   end
end

# _*_ mode: ruby
# vi: set ft=ruby
