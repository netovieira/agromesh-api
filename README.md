# agromesh-api


### Useful


#### Reboot Nodes
```bash
curl --location --request POST 'https://agromesh.nahes.com.br/iot/5797fc/device/ab/2' --header 'Content-Type: application/json' --data-raw '{"state": 0, "rebooted": "force" }'
```


#### Reboot Gateway
```bash
curl --location --request POST 'https://agromesh.nahes.com.br/iot/5797fc' --header 'Content-Type: application/json' --data-raw '{"rebooted": "force" }'
```
