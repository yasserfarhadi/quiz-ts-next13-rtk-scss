import styles from './page.module.scss';
import QuestionWizard from '@/components/QuestionWizard/QuestionWizard';

export default async function Home() {
  const res = await fetch(`${process.env.HOST}/api/questions/`, {
    method: 'GET',
  });
  const data = await res.json();

  return (
    <main className={styles.main}>
      <QuestionWizard questions={data.data} />
    </main>
  );
}
