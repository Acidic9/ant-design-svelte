<script>
    import ReactWrapper from '../../utils/ReactWrapper.svelte'
    import {CardSample} from './Sample'
    import {Row, Col} from '../../../'
</script>

<Row>
    <div style="width: 100%;">
        <h1>Card</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore explicabo fugiat blanditiis aliquid quo, iste quam veniam officia, officiis sit reiciendis repellendus vel corporis dignissimos eveniet in iusto praesentium adipisci.</p>
        <h2>Sub-Sample</h2>
        <Row gutter={8}>
            <Col span={12}>
                <h3>Svelte</h3>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad totam ex explicabo animi similique iste natus optio laborum ullam placeat nisi provident nesciunt molestiae repellat, voluptas, veritatis, perspiciatis ratione molestias!</p>
                </div>
            </Col>
            <Col span={12}>
                <h3>React</h3>
                <ReactWrapper component={CardSample}/>
            </Col>
        </Row>
    </div>
</Row>


