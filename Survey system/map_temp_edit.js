let selectedBarangay = null;

function goBack() {
  window.history.back();
}

function goNext() {
  if (!selectedBarangay) {
    alert('Please click a location pin marker to select a barangay first.');
    return;
  }
  window.location.href = `map_details.html?barangay=${encodeURIComponent(selectedBarangay)}`;
}
