import bcrypt from 'bcryptjs'//to hash a password


const users=[
    {
         nom:'Admin',
         email:'admin@example.com',
         password:bcrypt.hashSync('123456',10),
         isAdmin:true,
         isauthor:true
    },
    {
        nom:'auteur1',
        email:'auteur1@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
        isauthor:true
   },
   {
        nom:'ayoub',
        email:'ayoub@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
        isauthor:false
},
{
        nom:'auteur2',
        email:'auteur2@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
        isauthor:true
},
{
        nom:'ahmed',
        email:'ahmed@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
        isauthor:false
}
]

export default users