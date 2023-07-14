import { Answer, Answers, Question, Row } from '@/types/types';
import { shuffle } from '@/utils/shuffle';
import { NextResponse } from 'next/server';
import { readFileSync } from 'node:fs';
import path from 'path';
import * as XLSX from 'xlsx';

function arrayToChunkArray(array: any[], chunkSize: number) {
  const finalArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    finalArray.push(chunk);
  }
  return finalArray;
}

export async function GET() {
  const file = readFileSync(path.join(process.cwd(), 'data', 'data.xlsx'));
  const workbook = XLSX.read(file, { type: 'buffer' });
  const data: Question[] = [];
  workbook.SheetNames.forEach((sheet) => {
    const sheetArr: Row[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const splitToQuad = arrayToChunkArray(sheetArr.slice(2), 4);
    splitToQuad.forEach((quad) => {
      const item: Partial<Question> = { answers: [] };
      quad.forEach((row) => {
        const answer: Partial<Answer> = {};
        if ('data' in row) {
          item.question_text = row.data as string;
          answer.text = row.__EMPTY as string;
          answer.is_correct = Boolean(row.__EMPTY_1);
        } else {
          answer.text = row.__EMPTY as string;
          answer.is_correct = Boolean(row.__EMPTY_1);
        }
        (item.answers as Answers).push(answer as Answer);
      });
      item.answers = shuffle(item.answers as Answers);
      data.push(item as Question);
    });
  });
  return NextResponse.json({ data });
}
