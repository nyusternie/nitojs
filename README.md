# Nito JS Library

![Cloud Server Room](https://i.imgur.com/s61VG1b.png)

### Process Overview

1. Publish a list of available pools to Orbit DB.
2. Users submit their requests.
3. Requests are processed then added to the Key-Value (pool) Dbs.
4. Approved users can then submit Tx Details to the Event Log.
5. Participant keys can then be used to check (receipt) db.

### Published pools

Uses a key-value db to store the available exchange pools.

__NitoExchangeCloud.getPools()__

`orbitdb.get("pools")`

__Returns__

```
[
    {
        "id": "ef7e04e2-0265-4c7c-98b1-904d1cdae584",
        "amount": 10000,
        "members": 7,
        "createdAt": 1587140400000
    },
    ...
    {
        "id": "cf6ad147-a4d4-47b4-b131-e344bd533c76",
        "amount": 1000000000,
        "members": 3,
        "createdAt": 1587140400000
    }
]
```

> __NOTE:__ ids are ephemeral and will change after each subsequent round.

### User requests

Users submit their request to the Event Log.

### Pool details

Retrieve the details for the respective pool.

__NitoExchangeCloud.getPool("13522d9b-2189-437c-b47e-5b3d277a6127")__

`orbitdb.get("pool.13522d9b-2189-437c-b47e-5b3d277a6127")`

__Returns__

```
{
    "id": "13522d9b-2189-437c-b47e-5b3d277a6127",
    "amount": 100000,
    "members": [
        "0330eae4-9344-4e43-803b-3d9eceeff48f",
        ...
        "40d8ce87-e99a-4c82-9200-6eea5e1af105"
    ],
    "output": 148200
    "failures": 0,
    "status": 0,
    "createdAt": 1587140400000,
    "completedAt": 0
}
```

### Receipts

Players can check their receipt status in real-time by providing their receipt id (ie. their pool player id).

> __NOTE:__ Receipt ids are encrypted and saved on-chain by the respective player, using the Bitcoin File Storage (BFS) protocol.

__NitoExchangeCloud.getReceipt("d440438e-21b0-40ea-a1fe-eebc2f80c744")__

`orbitdb.get("receipt.d440438e-21b0-40ea-a1fe-eebc2f80c744")`

__Returns__

```
{
    "id": "d440438e-21b0-40ea-a1fe-eebc2f80c744",
    "status": 0,
    "createdAt": 1587140400000,
    "completedAt": 1587183600000
}
```
