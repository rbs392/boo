class Services {
  fetchPage(url) {
    return fetch(`/api/page?url=${encodeURIComponent(url)}`)
    .then(data => data.json());
  }

  fetchOutput(data) {
    return fetch('/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  }
}

export default new Services();
