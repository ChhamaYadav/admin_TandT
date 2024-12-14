// JavaScript for Modal
    function openUserModal() {
      document.getElementById('userModal').style.display = 'block';
    }

    function closeUserModal() {
      document.getElementById('userModal').style.display = 'none';
    }

    function viewProfile(userId) {
      alert('Viewing profile for user ID: ' + userId);
    }

    function editUser(userId) {
      alert('Editing user ID: ' + userId);
      openUserModal();
    }

    function deleteUser(userId) {
      if (confirm('Are you sure you want to delete user ID: ' + userId + '?')) {
        alert('User ID: ' + userId + ' deleted');
      }
    }