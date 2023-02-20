import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();
const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number | undefined }) => {
	return `${src}?w=${width}&q=${quality || 75}`;
};
interface Cardprops {
	imagesrc: string;
	title: string;
	skillTree: string;
	skill: string;
	type: string;
	difficulty: number;
	experience: number;
	gold: number;
}
const Card = ({ imagesrc, title, skillTree, skill, type, difficulty, experience, gold }: Cardprops) => {
	return (
		<div className='card'>
			<Image
				loader={myLoader}
				className='cardImage'
				src={imagesrc}
				alt='cardImage'
				width='0'
				height='0'
				style={{ width: '100%', height: 'auto', minWidth: '100px', maxHeight: '250px' }}
				priority
			/>
			<div className='cardTitle'>{title.toUpperCase()}</div>
			<div className='cardInfo'>
				<div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Skill Tree</p>
						<p className='cardValue'>{skillTree}</p>
					</div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Skill</p>
						<p className='cardValue'>{skill}</p>
					</div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Type</p>
						<p className='cardValue'>{type}</p>
					</div>
				</div>
				<div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Difficulty</p>
						<div className='difficultyLevel'>
							{/* {[...Array(difficulty).keys()].map((key)=>(

							))} */}
						</div>
					</div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Experience</p>
						<p className='cardValue'>{experience}</p>
					</div>
					<div className='cardInfoItem'>
						<p className='cardCategory'>Gold</p>
						<p className='cardValue'>{gold}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const CardContainer = () => {
	const { isLoading, error, data } = useQuery('repoData', () => fetch('/api/quests').then((res) => res.json()));

	if (isLoading)
		return (
			<div className='container'>
				<div className='loader'></div>
			</div>
		);

	if (error) return <p>'An error has occurred: '</p>;

	if (data.length > 0) {
		return (
			<div className='container'>
				<div className='card_container'>
					{data.map((cardData: any) => {
						return (
							<Link href={`/quest/${cardData.id}`} key={cardData.id} style={{ textDecoration: 'none' }}>
								<Card
									imagesrc={cardData.cover}
									title={cardData.title}
									skillTree={cardData.skillTree}
									skill={cardData.skill}
									type={cardData.type}
									difficulty={cardData.difficulty}
									experience={cardData.experience}
									gold={cardData.gold}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		);
	} else return <div></div>;
};

export default function Home() {
	return (
		<>
			<Head>
				<title>Node Guardians</title>
				<meta name='description' content='Node Guardians frontend' />
			</Head>

			<main>
				<Image src={'/NG logo.png'} alt='logo' width={320} height={35} className='applogo' priority />
				<QueryClientProvider client={queryClient}>
					<CardContainer />
				</QueryClientProvider>
			</main>
		</>
	);
}
