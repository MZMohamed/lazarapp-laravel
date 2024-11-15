<?php

namespace Database\Seeders;

use App\Models\Operator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operators = [
            'Thandisile Makisi',
            'Promise Mqhatsu',
            'Ngonidashe Mudenga',
            'Tieho Teromo',
            'Wesley Afrika',
            'Jonah Mtonhdozi',
            'Donrico Isaacs',
            'Ntongontongo Sigotyana',
            'John Kangara',
            'Carlo Jacobs',
            'Joseph Musorosekwa',
            'Molefi Molai',
            'Blessing Mhukayesango',
            'Privilege Nhaka',
            'Kumurai Lednos',
            'Simbarashe Sibanda',
            'Sanele Dyan',
            'David Shumba',
            'Edmore Tembo',
            'Kelvin Mudenga',
            'Elson Chibaya',
            'Trymore Munhu',
            'Leboneng Khasake',
            'Whisper Masungo',
            'Edward Nyirenda',
            'Konny Banda',
            'Carlo Van Aarde',
            'Ignatius Isaacs',
            'Antonio Stevens',
            'Pumelo Sigcu',
            'Lovemore Tawandaza',
            'Caution Taravinga',
            'Jason-Lee Jansen',
            'Tawanda Biti',
        ];

        foreach ($operators as $key) {
            Operator::create(['name' => $key]);
        }
    }
}
