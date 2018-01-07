import React from 'react';
import './NewsPanel.css';
import NewsCard from  '../NewsCard/NewsCard';
import _ from 'lodash';

class NewsPanel extends React.Component {
    constructor()
    {
        super();
        this.state = { news:null };
        //this.handleScroll = this.handleScroll.bind(this);
        //bind if not using arrow function in componentDidMount()
    }

    handleScroll() {
        const scrollY = window.scrollY 
            || window.pageYOffset 
            || document.documentElement.scrollYTop;
        if((window.innerHeight + scrollY) >= (document.body.offsetHeight-50)) {
            console.log('loading more news!');
            this.loadMoreNews();
        }
    }

    componentDidMount(){
        this.loadMoreNews();
        //use lodash for debouncing, recuding the number of requests sent to server
        //at most 1 request will be sent in 1 sec (1000 ms)
        this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
        //use only 'this.handleSchool' w/o brackets if not binding
        window.addEventListener('scroll', () => this.handleScroll());
    }

    loadMoreNews() {
        const news_url = 'http://' + window.location.hostname + ':3000/news';
        const request = new Request(news_url, {method: 'GET', cache: false}); //cache: no-store

        fetch(request)
            .then( res => res.json())
            .then( news => {
                this.setState({
                    news : this.state.news ? this.state.news.concat(news) : news                });
            })

        this.setState({
            
        });
    }

    renderNews() {
        const news_list = this.state.news.map( news => {
            return(
                //delete key={news.digest} if there is same key warning during development
                <a className='list-group-item' key={news.digest} href="#">
                    <NewsCard news={news} />
                </a>
            );
        });

        return (
        <div className='container-fluid'>
            <div className='list-group'>
                {news_list}
            </div>
        </div>
        );
    }

    render() {
        if(this.state.news) {
            return (
              <div>
                  {this.renderNews()}
              </div>  
            );
        } else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

export default NewsPanel;