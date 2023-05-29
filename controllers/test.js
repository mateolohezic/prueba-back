const User = require('../model/users');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();
const userTokenSecret = process.env.CLAVE_USER
const adminTokenSecret = process.env.CLAVE_ADMIN

const testSection1 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1 } = req.body
        const { userId } = jwt.verify(token, userTokenSecret);
        let value;
        
        // Puntaje de 5 a 89:
        if (question1 == 1) {
            value = Math.floor(Math.random() * 6) + 5;
        } else if (question1 >= 2 && question1 <= 9) {
            value = Math.floor(Math.random() * 7) + (question1 - 1) * 8 + 3;
        } else if (question1 == 10) {
            value = Math.floor(Math.random() * 9) + 81;
        }

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.estrategico.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                "dominioDirectivoTestInicial.estrategico.question1": question1,
                "dominioDirectivoTestInicial.estrategico.sectionScore": value,
            })
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const testSection2 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16 } = req.body
        const { userId } = jwt.verify(token, userTokenSecret);

        let value1=0;
        let value2=0;
        let value3=0;
        let value4=0;
        let value5=0;
        let value6=0;
        let value7=0;
        let value8=0;
        let value9=0;
        let value10=0;
        let value11=0;
        let value12=0;
        let value13=0;
        let value14=0;
        let value15=0;
        let value16=0;
        let total;

        if (question1 === "Una declaración inspiradora que describe lo que la empresa quiere lograr a largo plazo."){
            value1 = 100
        }

        if (question2 === "Una declaración que describe el propósito fundamental de la empresa y su razón de ser."){
            value2 = 100
        }

        if (question3 === "Qué es, qué hace, para quien lo hace, cómo lo hace."){
            value3 = 100
        }

        if (question4=== "La misión describe lo que la empresa hace, mientras que la visión describe lo que la empresa quiere lograr a largo plazo."){
            value4 = 100
        }

        if (question5 === "Tener una comprensión profunda de la industria y el entorno en el que se encuentra la empresa."){
            value5 = 100
        }

        if (question6 === "La forma en que una empresa crea, entrega y captura valor."){
            value6 = 100
        }

        if (question7 === "La propuesta de valor, el segmento de clientes, los canales, la forma de relación, actividades y recursos clave, socios estratégicos, fuentes de ingresos y los costos asociados a la oferta de productos y servicios de la empresa."){
            value7 = 100
        }

        if (question8 === "Un conjunto de promesas que una empresa hace a sus clientes."){
            value8 = 100
        }

        if (question9 === "Para que los clientes entiendan exactamente lo que ofrece la empresa."){
            value9 = 100
        }

        if (question10 === "Tener una posición única en el mercado que permite a la empresa destacarse y tener éxito."){
            value10 = 100
        }

        if (question11 === "Un plan detallado que indica cómo la empresa llevará a cabo sus objetivos estratégicos."){
            value11 = 100
        }

        if (question12 == 12) {
            value12 = Math.floor(Math.random() * 10) + 1;
        } else if (question12 >= 2 && question12 <= 9) {
            value12 = Math.floor(Math.random() * 10) + (question12 - 1) * 10 + 1;
        } else if (question12 == 10) {
            value12 = Math.floor(Math.random() * 10) + 91;
        }

        if (question13 == 1) {
            value13 = Math.floor(Math.random() * 10) + 1;
        } else if (question13 >= 2 && question13 <= 9) {
            value13 = Math.floor(Math.random() * 10) + (question13 - 1) * 10 + 1;
        } else if (question13 == 10) {
            value13 = Math.floor(Math.random() * 10) + 91;
        }

        if (question14 == 1) {
            value14 = Math.floor(Math.random() * 10) + 1;
        } else if (question14 >= 2 && question14 <= 9) {
            value14 = Math.floor(Math.random() * 10) + (question14 - 1) * 10 + 1;
        } else if (question14 == 10) {
            value14 = Math.floor(Math.random() * 10) + 91;
        }

        if (question15 == 1) {
            value15 = Math.floor(Math.random() * 10) + 1;
        } else if (question15 >= 2 && question1 <= 9) {
            value15 = Math.floor(Math.random() * 10) + (question15 - 1) * 10 + 1;
        } else if (question15 == 10) {
            value15 = Math.floor(Math.random() * 10) + 91;
        }

        if (question16 == 1) {
            value16 = Math.floor(Math.random() * 10) + 1;
        } else if (question16 >= 2 && question16 <= 9) {
            value16 = Math.floor(Math.random() * 10) + (question16 - 1) * 10 + 1;
        } else if (question16 == 10) {
            value16 = Math.floor(Math.random() * 10) + 91;
        }

        total = Math.floor((value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8 + value9 + value10 + value11 + value12 + value13 + value14 + value15 + value16)/16)
        if (total >= 95) {
            total = Math.floor(Math.random() * 6) + 90;
        } else if (total <= 5) {
            total = Math.floor(Math.random() * 6) + 5;
        }

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.conceptos.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                "dominioDirectivoTestInicial.conceptos.question1": question1,
                "dominioDirectivoTestInicial.conceptos.question2": question2,
                "dominioDirectivoTestInicial.conceptos.question3": question3,
                "dominioDirectivoTestInicial.conceptos.question4": question4,
                "dominioDirectivoTestInicial.conceptos.question5": question5,
                "dominioDirectivoTestInicial.conceptos.question6": question6,
                "dominioDirectivoTestInicial.conceptos.question7": question7,
                "dominioDirectivoTestInicial.conceptos.question8": question8,
                "dominioDirectivoTestInicial.conceptos.question9": question9,
                "dominioDirectivoTestInicial.conceptos.question10": question10,
                "dominioDirectivoTestInicial.conceptos.question11": question11,
                "dominioDirectivoTestInicial.conceptos.question12": question12,
                "dominioDirectivoTestInicial.conceptos.question13": question13,
                "dominioDirectivoTestInicial.conceptos.question14": question14,
                "dominioDirectivoTestInicial.conceptos.question15": question15,
                "dominioDirectivoTestInicial.conceptos.question16": question16,
                "dominioDirectivoTestInicial.conceptos.sectionScore": total,
            })
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const testSection3 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1, question2, question3, question4, question5, question1Justification, question2Justification, question3Justification, question4Justification, question5Justification } = req.body
        const { userId } = jwt.verify(token, userTokenSecret);

        let value1=0;
        let value2=0;
        let value3=0;
        let value4=0;
        let value5=0;
        let total;

        if (question1 === "Sí."){
            value1 = Math.floor(Math.random() * 11) + 90;
        }

        if (question2 === "Sí."){
            value2 = Math.floor(Math.random() * 11) + 90;
        }

        if (question3 === "Sí."){
            value3 = Math.floor(Math.random() * 11) + 90;
        }

        if (question4 === "Sí."){
            value4 = Math.floor(Math.random() * 11) + 90;
        }

        if (question5 === "Sí."){
            value5 = Math.floor(Math.random() * 11) + 90;
        }

        total = Math.floor((value1 + value2 + value3 + value4 + value5)/5)
        if (total >= 95) {
            total = Math.floor(Math.random() * 6) + 90;
        } else if (total <= 5) {
            total = Math.floor(Math.random() * 6) + 5;
        }

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.mercado.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                "dominioDirectivoTestInicial.mercado.question1": question1,
                "dominioDirectivoTestInicial.mercado.question1Justification": question1Justification,
                "dominioDirectivoTestInicial.mercado.question2": question2,
                "dominioDirectivoTestInicial.mercado.question2Justification": question2Justification,
                "dominioDirectivoTestInicial.mercado.question3": question3,
                "dominioDirectivoTestInicial.mercado.question3Justification": question3Justification,
                "dominioDirectivoTestInicial.mercado.question4": question4,
                "dominioDirectivoTestInicial.mercado.question4Justification": question4Justification,
                "dominioDirectivoTestInicial.mercado.question5": question5,
                "dominioDirectivoTestInicial.mercado.question5Justification": question5Justification,
                "dominioDirectivoTestInicial.mercado.sectionScore": total,
            })
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const testSection4 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question1Justification, question2Justification, question3Justification, question4Justification, question5Justification, question6Justification, question14Justification, question15Justification } = req.body
        const { userId } = jwt.verify(token, userTokenSecret);

        let value1=0;
        let value2=0;
        let value3=0;
        let value4=0;
        let value5=0;
        let value6=0;
        let value7=0;
        let value8=0;
        let value9=0;
        let value10=0;
        let value11=0;
        let value12=0;
        let value13=0;
        let value14=0;
        let value15=0;
        let total;

        if (question1 === "Sí."){
            value1 = Math.floor(Math.random() * 4) + 97;
        }

        if (question2 === "Sí."){
            value2 = Math.floor(Math.random() * 4) + 97;
        }

        if (question3 === "Sí."){
            value3 = Math.floor(Math.random() * 4) + 97;
        }

        if (question4 === "Sí."){
            value4 = Math.floor(Math.random() * 4) + 97;
        }

        if (question5 === "Sí."){
            value5 = Math.floor(Math.random() * 4) + 97;
        }

        if (question6 === "Sí."){
            value6 = Math.floor(Math.random() * 4) + 97;
        }

        if (question7 === "Sí."){
            value7 = Math.floor(Math.random() * 4) + 97;
        }

        if (question8 === "Sí."){
            value8 = Math.floor(Math.random() * 4) + 97;
        }

        if (question9 === "Sí."){
            value9 = Math.floor(Math.random() * 4) + 97;
        }

        if (question10 === "Sí."){
            value10 = Math.floor(Math.random() * 4) + 97;
        }

        if (question11 === "Sí."){
            value11 = Math.floor(Math.random() * 4) + 97;
        }

        if (question12 === "Sí."){
            value12 = Math.floor(Math.random() * 4) + 97;
        }

        if (question13 === "Sí."){
            value13 = Math.floor(Math.random() * 4) + 97;
        }

        if (question14 === "Sí."){
            value14 = Math.floor(Math.random() * 4) + 97;
        }

        if (question15 === "Sí."){
            value15 = Math.floor(Math.random() * 4) + 97;
        }

        total = Math.floor((value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8 + value9 + value10 + value11 + value12 + value13 + value14 + value15)/15)
        if (total >= 95) {
            total = Math.floor(Math.random() * 6) + 90;
        } else if (total <= 5) {
            total = Math.floor(Math.random() * 6) + 5;
        }

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.emprendimiento.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                "dominioDirectivoTestInicial.emprendimiento.question1": question1,
                "dominioDirectivoTestInicial.emprendimiento.question1Justification": question1Justification,
                "dominioDirectivoTestInicial.emprendimiento.question2": question2,
                "dominioDirectivoTestInicial.emprendimiento.question2Justification": question2Justification,
                "dominioDirectivoTestInicial.emprendimiento.question3": question3,
                "dominioDirectivoTestInicial.emprendimiento.question3Justification": question3Justification,
                "dominioDirectivoTestInicial.emprendimiento.question4": question4,
                "dominioDirectivoTestInicial.emprendimiento.question4Justification": question4Justification,
                "dominioDirectivoTestInicial.emprendimiento.question5": question5,
                "dominioDirectivoTestInicial.emprendimiento.question5Justification": question5Justification,
                "dominioDirectivoTestInicial.emprendimiento.question6": question6,
                "dominioDirectivoTestInicial.emprendimiento.question6Justification": question6Justification,
                "dominioDirectivoTestInicial.emprendimiento.question7": question7,
                "dominioDirectivoTestInicial.emprendimiento.question8": question8,
                "dominioDirectivoTestInicial.emprendimiento.question9": question9,
                "dominioDirectivoTestInicial.emprendimiento.question10": question10,
                "dominioDirectivoTestInicial.emprendimiento.question11": question11,
                "dominioDirectivoTestInicial.emprendimiento.question12": question12,
                "dominioDirectivoTestInicial.emprendimiento.question13": question13,
                "dominioDirectivoTestInicial.emprendimiento.question14": question14,
                "dominioDirectivoTestInicial.emprendimiento.question14Justification": question14Justification,
                "dominioDirectivoTestInicial.emprendimiento.question15": question15,
                "dominioDirectivoTestInicial.emprendimiento.question15Justification": question15Justification,
                "dominioDirectivoTestInicial.emprendimiento.sectionScore": total,
            })
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const testSection5 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1, question2, question3, question4, question5, question6, question7, question8 } = req.body
        const { userId } = jwt.verify(token, userTokenSecret);

        let value1=0;
        let value2=0;
        let value3=0;
        let value4=0;
        let value5=0;
        let value6=0;
        let value7=0;
        let value8=0;

        if (question1 == 1) {
            value1 = Math.floor(Math.random() * 10) + 1;
        } else if (question1 >= 2 && question1 <= 9) {
            value1 = Math.floor(Math.random() * 10) + (question1 - 1) * 10 + 1;
        } else if (question1 == 10) {
            value1 = Math.floor(Math.random() * 10) + 91;
        }

        if (question2 == 1) {
            value2 = Math.floor(Math.random() * 10) + 1;
        } else if (question2 >= 2 && question2 <= 9) {
            value2 = Math.floor(Math.random() * 10) + (question2 - 1) * 10 + 1;
        } else if (question2 == 10) {
            value2 = Math.floor(Math.random() * 10) + 91;
        }

        if (question3 == 1) {
            value3 = Math.floor(Math.random() * 10) + 1;
        } else if (question3 >= 2 && question3 <= 9) {
            value3 = Math.floor(Math.random() * 10) + (question3 - 1) * 10 + 1;
        } else if (question3 == 10) {
            value3 = Math.floor(Math.random() * 10) + 91;
        }

        if (question4 == 1) {
            value4 = Math.floor(Math.random() * 10) + 1;
        } else if (question4 >= 2 && question4 <= 9) {
            value4 = Math.floor(Math.random() * 10) + (question4 - 1) * 10 + 1;
        } else if (question4 == 10) {
            value4 = Math.floor(Math.random() * 10) + 91;
        }

        if (question5 == 1) {
            value5 = Math.floor(Math.random() * 10) + 1;
        } else if (question5 >= 2 && question5 <= 9) {
            value5 = Math.floor(Math.random() * 10) + (question5 - 1) * 10 + 1;
        } else if (question5 == 10) {
            value5 = Math.floor(Math.random() * 10) + 91;
        }

        if (question6 == 1) {
            value6 = Math.floor(Math.random() * 10) + 1;
        } else if (question6 >= 2 && question6 <= 9) {
            value6 = Math.floor(Math.random() * 10) + (question6 - 1) * 10 + 1;
        } else if (question6 == 10) {
            value6 = Math.floor(Math.random() * 10) + 91;
        }

        if (question7 == 1) {
            value7 = Math.floor(Math.random() * 10) + 1;
        } else if (question7 >= 2 && question7 <= 9) {
            value7 = Math.floor(Math.random() * 10) + (question7 - 1) * 10 + 1;
        } else if (question7 == 10) {
            value7 = Math.floor(Math.random() * 10) + 91;
        }

        if (question8 == 1) {
            value8 = Math.floor(Math.random() * 10) + 1;
        } else if (question8 >= 2 && question8 <= 9) {
            value8 = Math.floor(Math.random() * 10) + (question8 - 1) * 10 + 1;
        } else if (question8 == 10) {
            value8 = Math.floor(Math.random() * 10) + 91;
        }

        total = Math.floor((value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8)/8)
        if (total >= 95) {
            total = Math.floor(Math.random() * 6) + 90;
        } else if (total <= 5) {
            total = Math.floor(Math.random() * 6) + 5;
        }

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.habilidadesDirectivas.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                "dominioDirectivoTestInicial.habilidadesDirectivas.question1": question1,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question2": question2,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question3": question3,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question4": question4,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question5": question5,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question6": question6,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question7": question7,
                "dominioDirectivoTestInicial.habilidadesDirectivas.question8": question8,
                "dominioDirectivoTestInicial.habilidadesDirectivas.sectionScore": total,
            })
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const testSection6 = async (req, res) => {
    try{
        const { token } = req.body
        const { question1, question2, question3, question4, question5, question1Justification, question3Justification, question4Justification, question5Justification} = req.body
        const { userId } = jwt.verify(token, userTokenSecret);

        let value1=0;
        let value2=0;
        let value3=0;
        let value4=0;
        let value5=0;
        let total;

        if (question1 === "Sí."){
            value1 = Math.floor(Math.random() * 4) + 97;
        }

        if (question2 == 1) {
            value2 = Math.floor(Math.random() * 10) + 1;
        } else if (question2 >= 2 && question2 <= 9) {
            value2 = Math.floor(Math.random() * 10) + (question2 - 1) * 10 + 1;
        } else if (question2 == 10) {
            value2 = Math.floor(Math.random() * 10) + 91;
        }

        if (question3 === "Sí."){
            value3 = Math.floor(Math.random() * 4) + 97;
        }

        if (question4 === "Sí."){
            value4 = Math.floor(Math.random() * 4) + 97;
        }

        if (question5 === "Sí."){
            value5 = Math.floor(Math.random() * 4) + 97;
        }

        total = Math.floor((value1 + value2 + value3 + value4 + value5)/5)
        if (total >= 95) {
            total = Math.floor(Math.random() * 6) + 90;
        } else if (total <= 5) {
            total = Math.floor(Math.random() * 6) + 5;
        }

        const questionnaire1StartEnabled = false

        const user = await User.findById(userId);
        if (user.dominioDirectivoTestInicial.habilidadesDigitales.sectionScore != "Undefined"){
            res.status(206).send(`No permitido.`)
        } else{
            await User.findByIdAndUpdate(userId, {
                questionnaire1StartEnabled,
                "dominioDirectivoTestInicial.habilidadesDigitales.question1": question1,
                "dominioDirectivoTestInicial.habilidadesDigitales.question1Justification": question1Justification,
                "dominioDirectivoTestInicial.habilidadesDigitales.question2": question2,
                "dominioDirectivoTestInicial.habilidadesDigitales.question3": question3,
                "dominioDirectivoTestInicial.habilidadesDigitales.question3Justification": question3Justification,
                "dominioDirectivoTestInicial.habilidadesDigitales.question4": question4,
                "dominioDirectivoTestInicial.habilidadesDigitales.question4Justification": question4Justification,
                "dominioDirectivoTestInicial.habilidadesDigitales.question5": question5,
                "dominioDirectivoTestInicial.habilidadesDigitales.question5Justification": question5Justification,
                "dominioDirectivoTestInicial.habilidadesDigitales.sectionScore": total,
            })
            totalPoints(userId)
            verifyRanking()
            res.status(200).send(`Se actualizo el usuario con éxito.`)
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Ocurrió un error inesperado.' });
        }
    }
}

const totalPoints = async (userId) =>{
    if(userId){
        try {
            const user = await User.findById(userId);
            const section1Score = parseInt(user.dominioDirectivoTestInicial.estrategico.sectionScore)
            const section2Score = parseInt(user.dominioDirectivoTestInicial.conceptos.sectionScore)
            const section3Score = parseInt(user.dominioDirectivoTestInicial.mercado.sectionScore)
            const section4Score = parseInt(user.dominioDirectivoTestInicial.emprendimiento.sectionScore)
            const section5Score = parseInt(user.dominioDirectivoTestInicial.habilidadesDirectivas.sectionScore)
            const section6Score = parseInt(user.dominioDirectivoTestInicial.habilidadesDigitales.sectionScore)
            const total = Math.floor((section1Score + section2Score + section3Score + section4Score + section5Score + section6Score)/6)
            await User.findByIdAndUpdate(userId, {
                totalScore: total,
                "dominioDirectivoTestInicial.totalScore": total,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const verifyRanking = async () => {
    try {
        const users = await User.find({ status: 'active', totalScore: { $ne: 0 } }).sort({ totalScore: -1 });
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await User.findByIdAndUpdate(user._id, {
            rankingPosition: i + 1,
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

verifyRanking()

module.exports = { testSection1, testSection2, testSection3, testSection4, testSection5, testSection6 }