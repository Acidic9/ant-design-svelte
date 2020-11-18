import React, { FC } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export const Titles: FC = () => <div>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
</div>

export const BasicTitles: FC = () => <div>
    <h1>h1. Ant Design</h1>
    <h2>h2. Ant Design</h2>
    <h3>h3. Ant Design</h3>
    <h4>h4. Ant Design</h4>
    <h5>h5. Ant Design</h5>
</div>