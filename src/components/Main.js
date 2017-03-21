require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';


class AppComponent extends React.Component {
  constructor(props) {
    super(props)

    var minioClient = new Minio.Client({
      endPoint: 'play.minio.io',
      port: 9000,
      secure: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    });

    this.state = {
      img: "http://www.kikiaolaconstruction.com/pics/rt65s.jpg",
      minioClient: minioClient
    }
  }
  componentDidMount() {
    this.state.poller = this.state.minioClient.listenBucketNotification('alice', '', '.jpg', ['s3:ObjectCreated:*'])

    this.state.poller.on('notification', record => {
      this.setState({
	img: `https://play.minio.io:9000/${record.s3.bucket.name}/${record.s3.object.key}`
      })
      console.log(record)
    })
  }
  render() {
    return (
      <div className="index">
        <img src={this.state.img} alt="Yeoman Generator" />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
