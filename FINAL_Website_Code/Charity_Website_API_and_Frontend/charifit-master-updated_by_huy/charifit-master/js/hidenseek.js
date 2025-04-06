document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
});

