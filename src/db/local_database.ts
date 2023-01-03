import LocalDatabase from 'local_database';

const ldb = new LocalDatabase({
  rootFolderName: '124',
});

ldb.init();

export default ldb;
