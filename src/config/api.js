function fetchCrime() {
  return new Promise((resolve, reject) => {
    fetch("https://data.police.uk/api/crime-categories")
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject({ Message: "Something went Wrong" });
        console.log("Error: ", err);
      });
  });
}
function fetchForce() {
  return new Promise((resolve, reject) => {
    fetch("https://data.police.uk/api/forces")
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject({ Message: "Something went Wrong" });
        console.log("Error: ", err);
      });
  });
}

function fetchApi(crime, force) {
  // alert(crime + " , " + force);
  return new Promise((resolve, reject) => {
    fetch(
      `https://data.police.uk/api/crimes-no-location?category=${crime ? crime : 'all-crime'}&force=${force ? force : "avon-and-somerset"}`
      // `https://data.police.uk/api/crimes-no-location?category=all-crime&force=avon-and-somerset`
    )
      .then(response => response.json())
      .then(result => {
        resolve(result);
        // console.log(resolve(result));
      })
      .catch(err => {
        reject({ Message: "Something went Wrong" });
        console.log("Error: ", err);
      });
  });
}

export { fetchCrime, fetchForce, fetchApi };
