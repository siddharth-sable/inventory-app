import time
from main import redis, Order

key = 'order_refunded'
group = 'payment-group'

try:
    redis.xgroup_create(key, group)
except:
    print('Group Alredy Exists!')

while True:
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)

        if results != []:
            print(results)
            for result in results:
                obj = result[1][0][1]
                order = Order.get(obj['pk'])
                order.status = 'refunded'
                order.save()

    except Exception as e:
        print(str(e))

    time.sleep(1)
