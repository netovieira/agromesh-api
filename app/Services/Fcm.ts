import User from "App/Models/User";
import axios from "axios";
import Env from '@ioc:Adonis/Core/Env'
import MobileDevice from "App/Models/MobileDevice";

export default class Fcm {

  public static async send(title: String, message: String, user: User) {

    if(!Env.get('SEND_PUSH')) return;

    await user.load('mobileDevices')
    user.mobileDevices.forEach((mobileDevice: MobileDevice) => {
      const token = mobileDevice.token;
      const params = {
        notification: {
          title: title,
          body: message,
          sound: 'default',
          icon: 'notification_icon',
          image: ''
        },
        data: {},
        to: token,
        priority: "high",
        restricted_package_name: ""
      }
      console.log({
        token: token,
        params: params
      })

      axios.post('https://fcm.googleapis.com/fcm/send', params, {
        headers: {
          'Authorization' : 'key='+Env.get('FIREBASE_KEY'),
          'Content-Type'  : 'application/json'
        }
      }).then((resp) =>{
        console.log(resp.data, resp.status)
      })
    });
  }
}
