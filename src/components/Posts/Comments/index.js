import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd';

export default class index extends Component {
    render() {
        const listData = [];
        for (let i = 0; i < 2; i++) {
            listData.push({
                href: 'http://ant.design',
                title: `Chim Sẻ`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Reply to @Chích Chè',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        return (

            <List
                itemLayout="vertical"
                size="small"
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="heart" text="69" />, <IconText type="message" text="21" />, <IconText type="share-alt" text="96" />]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        <div style={{marginLeft: '12%'}}>{item.content}</div>
                        
                    </List.Item>
                )}
            />
        );
    }
}
