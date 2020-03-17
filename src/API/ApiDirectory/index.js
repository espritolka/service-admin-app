import Get from './get';
import Add from './add';
import Delete from './delete';
import Update from './update';

export default class ApiDirectory{

    Get = new Get();
    Add = new Add();
    Update = new Update();
    Delete = new Delete();

}