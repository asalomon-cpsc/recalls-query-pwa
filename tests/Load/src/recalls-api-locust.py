from locust import HttpLocust, TaskSet, task
import os

#del os.environ['http_proxy']
request_headers = {'content-type': 'application/json'}


class PwaApp(TaskSet):
   
    @task(1)
    def load_latest_search1(self):
        self.client.get("/Recall?format=json&description=atv")
    @task(2)
    def load_latest_search2(self):
        self.client.get("/Recall?format=json&description=ikea")

   


class PwaLocust(HttpLocust):
    task_set = PwaApp
    min_wait = 5000
    max_wait = 9000
    #http://Powertester/cgi-bin/dotnetapps/RestWebServices
