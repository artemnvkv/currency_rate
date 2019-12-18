# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

task :setup do
  puts '*** initialize application ***'
  Rake::Task['yarn:install'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
  Rake::Task['assets:precompile'].invoke
end

task :run do
  puts '*** start application ***'
  system('foreman start -f Procfile')
end
