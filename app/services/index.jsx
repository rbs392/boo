class Services {
  fetchPage(url) {
    return fetch(`/api/page?url=${encodeURIComponent(url)}`)
    .then(data => data.json());
  }

  fetchOutput(suites, url) {
    return fetch('/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ suites, url }),
    }).then(res => res.text());
  }
}

export default new Services();
