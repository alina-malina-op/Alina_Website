var pocik = document.getElementById('pocik'),
pocikAudio = document.getElementById('pocikAudo');
pocik.addEventListener('click', fPlay, false);
function fPlay() {
pocikAudio.play();
}