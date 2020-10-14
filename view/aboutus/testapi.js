document.write("<script type='text/javascript' src='../../data/api/index.js'></script>");

function testapi() {
    // debugger;
    TestInterface({ username: "Sherily", password: "123456" }).then((data) => {
        console.log("success::", data)
    }).catch(err => {
        console.log("failed:::", err)
    })
}