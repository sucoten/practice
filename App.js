import './App.css';
import { useState, useEffect} from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('apple');
  useEffect(() => {
    console.log('useEffectが走りました。')
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setImages(data.results)          //⑤APIを取ってきて、setImagesでデータを書き換える。→Imagesに新たなデータが入る
      })
  },[query])                             //④setQueryでqueryが変更されたので、useEffectが走る

  const onSubmit = (e) => {                   //③onSubmitが呼ばれる。inputタグの中のtextをsetQueryに渡し、またinputタグをまっさらにするためにsetTextに空の文字列を渡す
    e.preventDefault();
    setQuery(text);
    setText('');
    console.log("onSubmitが呼ばれました。")
  }

  return (
    <div className="App">
      <div className='main'>
        <form onSubmit={onSubmit}>     
          <input                            //①inputタグで何かを入力する
            type="text"
            onChange={e => setText(e.target.value)}    //②onChangeが呼ばれる。textのstateが変更される。
            value={text}  //初期入力値
          />
          <button type='submit'>          
            Search
          </button>
        </form>
      </div>
      <div className='container'>
        {
          images.map(image => (
            <div key={image.id} className='card'>
              <img src={image.urls.regular} className='card-img' alt="" />
              <div className='card-content'>
                <div className='card-title'>
                  {image.alt_description}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;

//images・・・ブラウザに現在表示されているimage（写真）を管理するstate
//text・・・検索バー（inputタグ）に入れる文字列を管理するstate
//query・・・検索ワードを管理するstate

//fetchはバッククォーテーション。$マークの後ろのqueryはuseStateのもの
//apiキーを直接埋め込まず、「process.env.REACT_APP_CLIENT_ID」とすることで、環境変数で設定した変数が格納される。
//useEffectが走るのはqueryが変更されたときなので、第二引数はquery。queryが変更されたときにAPIを叩いて、setImagesでimagesの変数を変更してくれる。
//onSubmitはform要素でのみ有効。送信ボタンが押されたときに起動するイベント。

//containerの中のurls,regular,alt_description（写真の名前）はブラウザのconsoleの中から持ってきている。
//keyとは、どの要素が変更、追加若しくは削除されたのかをReactが識別するためのもの。つけないと警告がでる。https://zenn.dev/luvmini511/articles/f7b22d93e9c182
