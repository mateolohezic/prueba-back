const User = require('../model/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const moment = require('moment');
require('dotenv').config();
const userTokenSecret = process.env.CLAVE_USER
const adminTokenSecret = process.env.CLAVE_ADMIN
const passwordTokenSecret = process.env.CLAVE_PASSWORD_RECOVERY

const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET USER CON TOKEN:

const getUserEspecifico = async (req, res) => {
    try {
      const token = req.params.token;

      if (!token) {
        return res.status(401).json({ message: 'No se encontró el token.' });
      }
  
      const decodedToken = jwt.verify(token, userTokenSecret);
      const { user: userToken } = decodedToken;
      const { _id } = userToken;
  
      try {
        const user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ message: 'El usuario no existe.' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      console.log(error);
      if (error.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'Token invalido.' });
      } else if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'Su sesión expiro.' });
      } else {
        res.status(500).json({ message: 'Error en el servidor.' });
      }
    }
};


// GET USER CON ID DE MONGOOSE:

// const getUserEspecifico = async (req, res) => {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(206).send('Invalid user ID');
//     }
//       try {
//         const user = await User.findById(id);
//         res.status(200).send(user);
//       } catch (error) {
//         res.status(206).json({ error: error.message });
//       }
// }


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        if (password === user.password && user.role === 'admin') {
          const adminToken = jwt.sign({ user }, adminTokenSecret, { expiresIn: '1d' });
          const token = jwt.sign({ user }, userTokenSecret, { expiresIn: '7d' });
          return res.status(200).json({ adminToken, token });
        } else if (password === user.password) {
          const token = jwt.sign({ user }, userTokenSecret, { expiresIn: '7d' });
          return res.status(200).json({ token });
        } else {
          return res.status(206).json({ message: 'Datos incorrectos.' });
        }
      } else {
        return res.status(206).json({ message: 'Datos incorrectos.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(206).json({ message: 'Ocurrió un error inesperado.' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.body
    if (id) {
        await User.findByIdAndDelete(id);
        res.status(200).send(`Se elimino el usuario con éxito.`)
    } else{
        res.status(206).send(`No id.`)
    }

}

const createUser = async (req, res) => {

    const { email } = req.body;
  
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;
    if (!emailPattern.test(email)) {
      res.status(400).json({ error: 'Email invalido.' });
      return;
    }
  
    const userExistentesEmail = await User.findOne({ email });
    if (userExistentesEmail) {
        res.status(206).json({ error: 'Este email ya está en uso.' });
    } else {
        const password = generateRandomPassword();
        const role = 'member';
        const status = 'active';
        const startDate = moment().format('DD/MM/YYYY');
        const totalScore = 0;
        const welcomeViewed = true;
        const questionnaire1StartEnabled = true;
        const questionnaire1FinalEnabled = false;

        const newUser = new User({
            name: "Undefined",
            surname: "Undefined",
            email,
            password,
            venture: "Undefined",
            territory: "Undefined",
            birthdate: "Undefined",
            startDate,
            rankingPosition: "Undefined",
            totalScore,
            biography: "Undefined",
            welcomeViewed,
            status,
            role,
            questionnaire1StartEnabled,
            questionnaire1FinalEnabled,
            dominioDirectivoTestInicial: {
                estrategico: {
                question1: "",
                sectionScore: "Undefined",
                },
                conceptos: {
                    question1: "",
                    question2: "",
                    question3: "",
                    question4: "",
                    question5: "",
                    question6: "",
                    question7: "",
                    question8: "",
                    question9: "",
                    question10: "",
                    question11: "",
                    question12: "",
                    question13: "",
                    question14: "",
                    question15: "",
                    question16: "",
                    sectionScore: "Undefined",
                },
                mercado: { 
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question2Justification: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    sectionScore: "Undefined",
                },
                emprendimiento: {
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question2Justification: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    question6: "",
                    question6Justification: "",
                    question7: "",
                    question8: "",
                    question9: "",
                    question10: "",
                    question11: "",
                    question12: "",
                    question13: "",
                    question14: "",
                    question14Justification: "",
                    question15: "",
                    question15Justification: "",
                    sectionScore: "Undefined",
                },
                habilidadesDirectivas: {
                    question1: "",
                    question2: "",
                    question3: "",
                    question4: "",
                    question5: "",
                    question6: "",
                    question7: "",
                    question8: "",
                    sectionScore: "Undefined",
                },
                habilidadesDigitales: {
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    sectionScore: "Undefined",
                },
                totalScore: "Undefined",
            },
            dominioDirectivoTestFinal: {
                estrategico: {
                question1: "",
                sectionScore: "Undefined",
                },
                conceptos: {
                    question1: "",
                    question2: "",
                    question3: "",
                    question4: "",
                    question5: "",
                    question6: "",
                    question7: "",
                    question8: "",
                    question9: "",
                    question10: "",
                    question11: "",
                    question12: "",
                    question13: "",
                    question14: "",
                    question15: "",
                    question16: "",
                    sectionScore: "Undefined",
                },
                mercado: { 
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question2Justification: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    sectionScore: "Undefined",
                },
                emprendimiento: {
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question2Justification: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    question6: "",
                    question6Justification: "",
                    question7: "",
                    question8: "",
                    question9: "",
                    question10: "",
                    question11: "",
                    question12: "",
                    question13: "",
                    question14: "",
                    question14Justification: "",
                    question15: "",
                    question15Justification: "",
                    sectionScore: "Undefined",
                },
                habilidadesDirectivas: {
                    question1: "",
                    question2: "",
                    question3: "",
                    question4: "",
                    question5: "",
                    question6: "",
                    question7: "",
                    question8: "",
                    sectionScore: "Undefined",
                },
                habilidadesDigitales: {
                    question1: "",
                    question1Justification: "",
                    question2: "",
                    question3: "",
                    question3Justification: "",
                    question4: "",
                    question4Justification: "",
                    question5: "",
                    question5Justification: "",
                    sectionScore: "Undefined",
                },
                totalScore: "Undefined",
            },
        });
        await newUser.save();
        await sendEmailNewUser(email, password)
        res.status(200).json(newUser);
    }
};

const generateRandomPassword = () =>{

    const length = 10;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}

const sendEmailNewUser = async ( email, password ) => {
    if ( email && password ){
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "stannumdevelopment@gmail.com",
                    pass: "yhroxynsojajtudi",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        
            let info = await transporter.sendMail({
                from: '"STANNUM Academy" stannumdevelopment@gmail.com',
                to: email,
                subject: "Bienvenido a STANNUM!", 
                html: `
                  <div style="width: 100%; text-align: center; background-color: #3A3A3A; padding: 2rem; border-bottom: 2px solid #67CCB9; background-attachment: fixed; background-repeat: no-repeat; background-blend-mode: multiply; background-image: url('https://doc-0c-90-docs.googleusercontent.com/docs/securesc/2lc7vs8d0n3e38d02dp61blmfed72min/m74lh5a2v0tudleh37urf8vp7kac8386/1685163075000/07405825733652792889/14585000474494058987/16bwV4nSFRBcfVFNuax3xlv-25LPqH-Xj?ax=ADWCPKB6LiEkrQSHog7bli8wFR9vSUvMOKrN70y6y5ycXjHfTnV5XCbioL07_IPj0phxf76l__e_Va8rVffS-Fo2I83Ij463JqM-Ta-GR2HSTBluqEEnZSLRdwJ3URrWuur0mS1YAB6nSyvlgIXJq--Bk6ipaZ9xXudCHlVfiEbSRphZhoN9fJxIDhr7C1g5LHqSyAWndKoBZ_d7OkRzJO1Nqwxrvc2F8qiInFqwi66KEkabVwESWH1g-184hY7VraTOy2QSiIz7cnkwzrWJH0TTY9SnbBNe1fa2ACFsA2SzG8xwRYd8WhNxM5ywhmhjqwR2Nji6rTgBBi27gPgJy2nJa8Ax7BsPdRMRNinwaeAlrNtrfV0xLJCUo25FnZMcGCewJJQJsaHtiAWnlOhu_96KiCDwNkdqD7tcH0_Nj8-FhjUjl4jCikzOpwmb_F6ny-vG-zm_qp3rr-Jc6gvNiz6WD6AHnyKJd_GcbZcV_3BnqVBy3eiKUTuBsMNHYM9ExUaM_TIMRTUtieL3X03woUE9ZBy-Tp_vgqDFe9CjXkzXH7080597lZjWpzgc_5wM4DTwSK_jxl1x1Q79RBnW7HgYGoeBmZV2kQ7YZdPEEJmRbdNWEb15uYpe1pHvw14dxIuUUReEiy_itJJsDonKHJ86SfVgj9ovqwL68mqrSsfBgUfTuhpY6PBJ9Bb-5XVXIYyDNGhEgMjHh5Ook-ge__SONwLb_C9TDeIkeuNyoppumh1EHW7foujYaUgek-uXP0LkS7-_ZDazjvqPL83WqTSKj9VaKPMfTNFSlK1HX51jnHcToLgO_Ukm1SOXHqpra6fF2jiA_RP7gtgg2fa7fkTm1bSXT0z_TONTjx2N9OS89k_jGdF5VSvAqxiN7fBRcFOO7Jv1X3suzLkbS3j3megwy6vuqDboDroUERvNhoCsomzJrijVsyj44ftz9Rg2b9bYXvRkoFgn9SfiFh7247Q73Hr9vdek9gZQqLvPAec4WdQjk1vVgYSCgTEr5AoOPy_2hvJIQSctFmWDZt6M_N3ZrAWXUwlre4O5DhaMfMY19-rETUgMt6kyFZPYV1eLgXnYoAWLhDbPtiOzClnyJ0GY-HWnApBvgOXmA98C3ez4QsVHqs6o4BEU351Y_WYF-3J6xMwqCticLnsTyC9PMKzA-vhHGP0I&uuid=5c02fc1e-f674-443a-a333-9d4f52f375d8&authuser=0'); background-position: center center;">
                    <img src="https://drive.google.com/uc?export=download&id=1T-hwu10IZ3_kkeyOZIhDUKISgFPAtMTk" alt="Logo" style="width: 200px; height: auto; margin: 20px auto;">
                  </div>
                  <div style="width: 100%; text-align: center; background-color: #fff; padding: 2rem;">
                    <p style="font-size: 24px; color: #3A3A3A; font-style: bold;">Bienvenido a STANNUM Academy!</p>
                    <p style="font-size: 16px; color: #3A3A3A;">Se ha generado una contraseña para que pueda acceder al sitio. Luego podrá cambiarla.</p>
                    <p style="font-size: 20px; color: #3A3A3A;">Su contraseña es: ${password}</p>
                    <p style="font-size: 16px; color: #3A3A3A;">Puede ingresar al sitio haciendo click en el botón:</p>
                    <a href="https://pruebastannumacademyinterna.netlify.app/Iniciar-sesion" style="display: inline-block; padding: 10px 20px; background-color: #67CCB9; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">Ir al sitio</a>    
                  </div>
                `,
              });            
        } catch (error) {
            console.log(error.message);
        }
    }
}

const patchUser = async (req, res) => {

    const { id, name, surname, venture, territory, birthdate, biography } = req.body

    await User.findByIdAndUpdate(id, {
      name,
      surname,
      venture,
      territory,
      birthdate,
      biography
    })

    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const passwordRecovery = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({"email": email})
      if (user) {
            const tokenNormal = jwt.sign({ user }, passwordTokenSecret, { expiresIn: "1h" })
            const token = Buffer.from(JSON.stringify(tokenNormal)).toString('base64');
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "stannumdevelopment@gmail.com",
                    pass: "yhroxynsojajtudi",
                },
                tls: {
                    rejectUnauthorized: false
                  }
              });
          
              let info = await transporter.sendMail({
                from: '"STANNUM Academy" stannumdevelopment@gmail.com',
                to: email,
                subject: "Olvide mi contraseña", 
                html: `            
                <div style="width: 100%; text-align: center; background-color: #3A3A3A; padding: 2rem; border-bottom: 4px solid #67CCB9;">
                  <img src="https://drive.google.com/uc?export=download&id=1T-hwu10IZ3_kkeyOZIhDUKISgFPAtMTk" alt="Logo" style="width: 200px; height: auto; margin: 20px auto;">
                </div>
                <div style="width: 100%; text-align: center; background-color: #DEDEDE; padding: 2rem;">
                  <p style="font-size: 20px; color: #3A3A3A;">Se ha generado un enlace para que puedas restaurar tu contraseña en STANNUM Academy.</p>
                  <p style="font-size: 16px; color: #3A3A3A;">Haz click en el botón de abajo para ir al enlace.</p>
                  <a href="https://pruebastannumacademyinterna.netlify.app/Recuperar-contrase%C3%B1a/Nueva-contrase%C3%B1a/${token}" style="display: inline-block; padding: 10px 20px; background-color: #67CCB9; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">Ir al sitio</a>    
                </div>
                `,
              });
              res.status(200).json("El correo se envió con éxito.");
        } else {
            res.status(206).send({ message: 'Usuario no encontrado' })
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ocurrió un error inesperado." });
    }
};

const changePassword = async (req, res) => {
    try {
      const { token, password } = req.body;
  
    const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString());
    const { user } = jwt.verify(decodedToken, passwordTokenSecret);
    const { _id } = user;
    await User.findByIdAndUpdate(_id, { 
        password 
    });
  
    res.status(200).json('La contraseña se cambio con éxito.');
    } catch (error) {
      console.log(error);
      if (error.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'El enlace es invalido.' });
      } else if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'El enlace expiró' });
      } else {
        res.status(500).json({ message: 'Error del servidor' });
      }
    }
};

module.exports = { createUser, getUser, deleteUser, patchUser, getUserEspecifico, loginUser, passwordRecovery, changePassword}