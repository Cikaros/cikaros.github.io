!(function () {
    var oldLoadAp = window.onload;
    window.onload = function () {
        oldLoadAp && oldLoadAp();
        new APlayer({
            container: document.getElementById('a-player'),
            fixed: true,
            autoplay: false,
            loop: 'all',
            order: 'random',
            theme: '#b7daff',
            preload: 'none',
            audio: [
                {
                    name: '今晚月色真美,风也溫柔',
                    artist: 'Cikaros',
                    url: 'https://music.163.com/song/media/outer/url?id=1348568637.mp3',
                    cover: 'https://p4.music.126.net/k0dN_-VgTlAfanUifBAUXQ==/109951163888814897.jpg?param=300x300'
                }
            ]
        });
    }
})();