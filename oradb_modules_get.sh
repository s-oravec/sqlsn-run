#!/bin/bash

git clone https://github.com/s-oravec/sqlsn-core.git oradb_modules/sqlsn-core
pushd oradb_modules/sqlsn-core
git checkout tags/0.1.1
popd

git clone https://github.com/s-oravec/sqlsn-stack.git oradb_modules/sqlsn-stack
pushd oradb_modules/sqlsn-stack
git checkout tags/0.1.1
popd
