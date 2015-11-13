--init sqlsn
@sqlsnrc.sql

--require run module from path (relative to sqlsn-core)
@&&sqlsn_require_from_path "../.."

--run scripts stored in directory tree
whenever oserror exit 1 rollback
@&&run_dir test_application

exit 0
