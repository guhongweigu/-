const baseUrl = 'http://124.235.209.122:88';
const imageUrl = 'http://124.235.209.122:88';
module.exports = {
    imageUrl,
    query({url, data, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${baseUrl}/${url}`,
                data: data,
                method: method,
                header: {'content-type': 'application/json'},
                dataType: 'json',
                success: resolve,
                fail: reject,
            });
        });
    },
    fetch({url, id}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${baseUrl}/${url}/${id}`,
                method: 'GET',
                header: {'content-type': 'application/json'},
                dataType: 'json',
                success: resolve,
                fail: reject,
            });
        });
    },
}
