from aiohttp import ClientSession


class HttpClient:
    def __init__(self, base_url: str, api_key: str):
        self.session = ClientSession(
            base_url = base_url,
            headers={
                'X-CMC_PRO_API_KEY': api_key
                }
        )

class CMCHTTPClient(HttpClient):
    async def get_listings(self):
        async with self.session.get('/v1/cryptocurrency/listings/latest',
                                    ssl=False) as response:
            if response.status == 200:
                data =  await response.json()
                return data["data"]
            else:
                raise Exception(f"Error: {response.status} - {await response.text()}")
        

    async def get_currency(self, currency_id: int):
        async with self.session.get(f'/v2/cryptocurrency/quotes/latest',
                                    params={"id": currency_id},
                                    ssl=False) as response:
            if (response.status == 200):
                data = await response.json()
                return data["data"][str(currency_id)]
            else:
                raise Exception(f"Error: {response.status} - {await response.text()}")