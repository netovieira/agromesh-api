import { BaseTask } from 'adonis5-scheduler/build'
import Task from "App/Models/Task";
import {DateTime} from "luxon";

export default class ChangeStateDeviceJob extends BaseTask {
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
	  await this.start()
	  await this.stop()
  }

  private async start() {
    const week_day = DateTime.now().toFormat('EEE').toUpperCase()
    const tasks = await Task.query()
      .where('active', true)
      .where('time_start', DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE))
      .where('week_days', 'like', `%${week_day}%`)
      .preload('devicePort')

    tasks.forEach((_task: Task) => {
      _task.devicePort.state = true
      _task.devicePort.save()
    })
  }

  private async stop() {
    const week_day = DateTime.now().setLocale('pt-br').toFormat('EEE').toUpperCase().replace('.', '')
    const tasks = await Task.query()
      .where('active', true)
      .where('time_stop', DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE))
      .where('week_days', 'like', `%${week_day}%`)
      .preload('devicePort')

    tasks.forEach((_task: Task) => {
      _task.devicePort.state = false
      _task.devicePort.save()
    })
  }
}
