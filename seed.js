const db = require('./db');
const Image = require('./models/image');
const Admin = require('./models/admin');
const { v4: uuidv4 } = require('uuid');

async function seed(){
    await db.sync({force:true, alter:true});
    await Admin.create({
        email: "tester@yahoo.com",
        admin_pass: "$2b$12$r171vuOoPyiWkidHKSkcLe9oo9R9E91xTjuMwyWdNCBrMV.fxUh82"
    })
    await Image.create({
        img_type: 'PNG',
        img_size: '240x240',
        img_name: "cats",
        img_path: uuidv4()
    });
    await Image.create({
        img_type: 'JPEG',
        img_size: '240x240',
        img_name: "more cats",
        img_path: uuidv4()
    });
    console.log('seeded db succesfully');
};

async function runSeed() {
    console.log("seeding...");
    try {
      await seed();
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
        console.log("closing db connection");
        process.exit();
    }
};

try {
    runSeed();
} catch (err){
    console.log(err);
}