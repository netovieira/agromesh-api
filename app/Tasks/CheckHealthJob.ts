import { BaseTask } from 'adonis5-scheduler/build'
import Task from "App/Models/Task";
import {DateTime} from "luxon";
import Fcm from "App/Services/Fcm";
import DeviceLog from "App/Models/DeviceLog";
import Env from "@ioc:Adonis/Core/Env";

export default class CheckHealthJob extends BaseTask {
	public static get schedule() {
		return '0 * * * * *' //EVERY MINUTE
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
	  await this.check()
  }

  private async check() {

    const logs = await DeviceLog.query()
      .whereNotNull('health')
      .where('created_at', '<=', DateTime.now().minus({minutes: Env.get('HEALTH_TIMEOUT')}).toLocaleString(DateTime.TIME_24_SIMPLE))
      .whereRaw('created_at == updated_at')
      .preload('Device');


    for (const log : DeviceLog of logs) {

      await log.device.load('Gateway');
      await log.device.gateway.load('User');
      const user = log.device.gateway.user;

      if (log.health == 'false')
        Fcm.send('Cadê o ' + log.device.name + '? 🤔', 'Perdemos a comunicação com o ' + log.device.name + '! 😰', user);

      if (log.health == 'true')
        Fcm.send('Ufa! Encontramos o ' + log.device.name + ' 🙏', 'A comunicação com o ' + log.device.name + ' foi restabelecida! 🤩', user);

      await log.save();

    }
  }
}
