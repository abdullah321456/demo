const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');
const userSchema = mongoose.Schema(
    {
        ID: {
            type: String,
            trim: true,
        },
        Name: {
            type: String,
            trim: true,
        },
        Father_Name: {
            type: String,
            trim: true,
            lowercase: true,
        },
        Gender: {
            type: String,
            trim: true,
        },
        Email: {
            type: String,
            trim: true,
        },
        Semester: {
            type: String,
            trim: true,
        },
        Address: {
            type: String,
            trim: true,
        },
        Admission_Date: {
            type: String,
            trim: true,
        },
        Registration_NO: {
            type: String,
            trim: true,
        },
        Image_URL: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
