--init sqlsn
@sqlsnrc.sql

--require run module from path (relative to sqlsn-core)
@&&sqlsn_require_from_path "../.."

--case
prompt
prompt * case [required module should load]

--assertions
prompt - command run_script [&&run_script] should be defined 
prompt - command run_dir_begin [&&run_dir_begin] should be defined 
prompt - command run_dir [&&run_dir] should be defined
prompt - command run_dir_end [&&run_dir_end] should be defined

--case
prompt
prompt * case [stac module required by run module should be loaded]

--assertions
prompt - command stack_create [&&stack_create] should be defined
prompt - command stack_push [&&stack_push] should be defined
prompt - command stack_pop [&&stack_pop] should be defined

exit 0
