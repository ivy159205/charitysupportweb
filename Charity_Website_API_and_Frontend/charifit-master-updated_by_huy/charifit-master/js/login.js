const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`https://localhost:7201/Login/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'POST'
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userData', JSON.stringify(data));
            document.getElementById('message').innerText = data.message;

            // Điều hướng theo role
            if (data.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            document.getElementById('message').innerText = data.message || 'Lỗi đăng nhập!';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Không thể kết nối tới server!';
    }
});


