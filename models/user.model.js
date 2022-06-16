const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const dataOff = mongoose.Schema(
  {
    id_off: {
      type: String,
      trim: true,
    },
    type_off: {
      type: String,
    },
    reg_no_off: {
      type: String,
    },
    tracking_off: {
      type: String,
    },
    name_off: {
      type: String,
    },
    email_off: {
      type: String,
    },
    nationality_off: {
      type: String,
    },
    Emi_off: {
      type: String,
    },
    dob_off: {
       type: String,
    },
    father_husband_name_off: {
        type: String,
    },
    employeeid_off: {
        type: String,
    },
    gender: {
        type: String,
    },
   address_off: {
        type: String,
    },
    joining_date_off: {
        type: String,
    },
    leaving_date_off: {
        type: String,
    },
    expire_date_off: {
        type: String,
    },
   is_permanent_address_qua: {
         type: String,
    },
    acom_by: {
         type: String,
    },
    employee_type_id: {
          type: Number,
    },
    category_type:{
           type: String,
    },
    country: {
       sub_id1: {
           type: Number,
       },
       name: {
           type: String,
       },
       category_id: {
            type: Number,
       }
    },
    district: {
       sub_id2: {
             type: Number,
       },
       name:{
            type: String,
       }
    },
    isil_off: {
       sub_id3: {
            type: Number,
       },
       name: {
            type: String,
       }
    },
    parkingslot_off: {
      sub_id4: {
             type: Number,
      },
      name: {
             type: String,
      }
    },
    park2slot: {
       sub_id5: {
             type: Number,
       } ,
       name: {
            type: String,
       }
    },
    deadline_off: {
      sub_id6: {
            type: Number,
      },
      number: {
            type: String,
      }
    },
    entry_point:  {
             type: String,
    },
     assessments: [
       {
        sub_id7: {
            type: Number,
        },
        question_1: {
           subid_8: {
             type: Number,
           },
           question_2: {
              type: String,
           }
        },
         answer: {
             type: String,
        }
      }
    ],
       image: {
             type: String,
       },
        medical_test: {
           type: String,
        },
        vaccination_status: {
              type: String,
        },
        vaccination_certificate:{
             type: String,
        },
        status: {
            type: String,
        }
  },
  {
    timestamps: true,
  }
);


const userSchema = mongoose.Schema(
    {
       data_off:dataOff
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('etisalatautomations', userSchema);

module.exports = User;