let result = "";
fetch("./frontEndData.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
fetch("./fronEndData.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (datas) {
    appendData(datas);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
function appendData(data) {
  data.forEach(({ ID, Username, avatar } = rows) => {
    result += `
        <section class="card" style="max-width: 320px">
              <div style="text-align: center">
                <img
                  src="/images/images__3_-removebg-preview.png"
                  class="card-img-top"
                  alt="..."
                  style="max-width: 165px"
                />
              </div>
              <div class="card-body">
                <h4 class="card-title">Steps Leaderboard</h4>
                <p class="card-text">put top 5 or top 10 here</p>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn-solid theme-primary"
                    name="Total_steps"
                  >
                    Total
                  </button>
                  <button
                    type="button"
                    class="btn-solid theme-primary"
                    name="month_steps "
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    class="btn-solid theme-primary"
                    name="week_steps "
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    class="btn-solid theme-primary"
                    name="daily_steps "
                  >
                    Today
                  </button>
                </div>
              </div>
            </section>
        `;
  });
  document.querySelector(".contained").innerHTML = result;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("js/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
