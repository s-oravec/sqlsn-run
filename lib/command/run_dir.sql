set echo off

define l_run_dir_path = &&1

rem changes g_run_path
@&&run_dir_begin_impl

prompt Performing action [&&g_run_action] using [&&g_run_path/&&g_run_script]
@&&g_run_path/&&g_run_script

undefine l_run_dir_path

@&&run_dir_end_impl