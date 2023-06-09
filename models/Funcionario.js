import { Sequelize } from "Sequelize";
import connection from '../config/db.js';
import Empresa from "./Empresa.js";
import bcrypt from 'bcrypt';

const Funcionario = connection.define(
    'funcionarios',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        idEmpresa: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'empresas',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    }
);

Funcionario.belongsTo(Empresa, {
    foreignKey: 'idEmpresa'
})

export default Funcionario;