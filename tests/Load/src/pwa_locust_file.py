from locust import HttpLocust, TaskSet, task

json_data1 = """
{
	data: {
		searchFor: 'ikea',
		productName: '',
		productType: '',
		manufacturerType: '',
		recallDateEnd: '',
		recallDateStart: ''
	}

}
"""
json_data2 = """
{
	data: {
		searchFor: 'atv',
		productName: '',
		productType: '',
		manufacturerType: '',
		recallDateEnd: '',
		recallDateStart: ''
	}

}
"""
request_headers = {'content-type': 'application/json'}


class PwaApp(TaskSet):
    @task
    def load(self):
        self.client.get("/")

    @task
    def load_latest(self):
        self.client.get("/api/recall/latest/")

    @task
    def search(l):  # https://m-recalls.cpsc.gov/api/recall/
         l.client.post("/api/recall",name="search1", data=json_data1,
                      headers=request_headers)

    @task
    def search2(self):
        self.client.post("/api/recall",name="search2", data=json_data2,headers=request_headers)


class PwaLocust(HttpLocust):
    task_set = PwaApp
    min_wait = 5000 #wait for at least 5 secondes before issuing new request per user
    max_wait = 15000 # request will fail if the latency crosses this treshold
