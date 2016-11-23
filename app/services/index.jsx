class Services {
  fetchPage (url) {
    return fetch(`/api/page?url=${encodeURIComponent(url)}`)
    .then(data => data.json());
  }
}

export default new Services();
