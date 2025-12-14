"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { type Pergunta, pergunta_schema } from "../pergutasTypo"
import type z from "zod"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormField } from "@/components/ui/form"

export default function cardEdicaoDePergunta({ pergunta, isVisible, onCancel }: { pergunta: Pergunta, isVisible: boolean, onCancel: Function}) {

    //Objeto usado para realizar operações de mutação no backend
    const mutation = api.pergunta.update.useMutation()

    //A checagem de validade dos parametros é feita utilizando o pergunta_schema, cheque ele para informações sobre os valores aceitos

    function onSubmit(values: z.infer<typeof pergunta_schema>) {
    //Função chamada quando apertamos o botão de editar e os dados passados são validos
        mutation.mutate({
            pergunta: values.pergunta,
            linguagem: values.linguagem,
            alternativa1: values.alternativa1,
            alternativa2: values.alternativa2,
            alternativa3: values.alternativa3,
            alternativa4: values.alternativa4,
            alt_correta: values.alt_correta,
            dificuldade: values.dificuldade,
            id: values.id,
        })
        //Chama a função cancel para modificar a visibilidade do card mas a operação foi realizada com sucesso
        //Caso algum problema ocorresse na mutation um erro seria gerado pelo backend
        onCancel()
    }

    function onBadSubmit(values: z.infer<typeof pergunta_schema>) {
    //Função chamada se os parametros passados forem inválidos
        alert("Parametros invalidos")
    }

    //Acessa o backend e recupera a string nome da linguagem com aquele id
    const linguagem = api.linguagens.findUniqueById.useQuery({ id: pergunta.linguagem_id }).data?.nome!

    //Cria um useForm para gerenciar os a mudança dos valores
    //Os valores padrão são os da pergunta passada
    const form = useForm<z.infer<typeof pergunta_schema>>({
        mode: "onChange",
        defaultValues: {
            pergunta: pergunta.pergunta,
            linguagem: "",
            alternativa1: pergunta.alternativa1,
            alternativa2: pergunta.alternativa2,
            alternativa3: pergunta.alternativa3,
            alternativa4: pergunta.alternativa4,
            alt_correta: pergunta.alt_correta,
            dificuldade: pergunta.dificuldade,
            id: pergunta.id
        },
        resolver: zodResolver(pergunta_schema)
    });
    //O valor de linguagem é passado depois para evitar problemas devido ao tempo de resposta do backend
    //Poderia ser evitado adicionando um parametro ao componente do card e o passando da mesma forma que é feito com a pergunta (via um useState)
    form.setValue("linguagem", linguagem)

    return (
        <form onSubmit={form.handleSubmit(onSubmit, onBadSubmit)} className={`w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 ${isVisible ? 'visible' : 'invisible'}`}>
            {/* Visibilidade passada dependendo do valor de isVisible */}
            <Card >
                <CardHeader>
                    <CardTitle>Editar pergunta</CardTitle>
                    <CardAction>
                        <Button variant="link" onClick={() => onCancel()}>Cancelar</Button>
                    </CardAction>
                </CardHeader>

                <CardContent>

                    <FieldSet>
                        <Field>
                            <Input type="text" placeholder="Pergunta" {...form.register("pergunta", { required: true })} />
                        </Field>

                        <FieldGroup className="flex flex-row min-w-fit">
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Opção 1</Label>
                                <Field><Input id="alternativa1" type="text" placeholder="Opção 1" {...form.register("alternativa1", { required: true })} /></Field>
                            </div>
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Opção 2</Label>
                                <Field><Input id="alternativa2" type="text" placeholder="Opção 2" {...form.register("alternativa2", { required: true })} /></Field>
                            </div>
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Opção 3</Label>
                                <Field><Input id="alternativa3" type="text" placeholder="Opção 3" {...form.register("alternativa3", { required: true })} /></Field>
                            </div>
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Opção 4</Label>
                                <Field><Input id="alternativa4" type="text" placeholder="Opção 4" {...form.register("alternativa4", { required: true })} /></Field>
                            </div>
                        </FieldGroup>

                        <FieldGroup className="flex flex-row min-w-fit">
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Linguagem</Label>
                                <Field><Input id="linguagem" type="text" placeholder="Linguagem" defaultValue={linguagem} {...form.register("linguagem", { required: true })} /></Field>
                            </div>
                            <div className='w-full max-w-xs space-y-2'>
                                <Label >Dificuldade</Label>
                                <Field><Input id="dificuldade" type="text" placeholder="Dificuldade" {...form.register("dificuldade", { required: true, valueAsNumber: true })} /></Field>
                            </div>
                        </FieldGroup>

                        <FormField
                            control={form.control}
                            name="alt_correta"
                            render={({ field }) => {
                                return (
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value !== undefined ? String(field.value) : ''}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Opção correta" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Opção 1</SelectItem>
                                            <SelectItem value="2">Opção 2</SelectItem>
                                            <SelectItem value="3">Opção 3</SelectItem>
                                            <SelectItem value="4">Opção 4</SelectItem>
                                        </SelectContent>

                                    </Select>
                                );
                            }} />


                    </FieldSet>


                </CardContent>
                <CardFooter className="flex-col gap-2 pt-2">
                    <Field className="flex flex-row max-w-1/10">
                        <Button type="submit" className="min-w-fit">Adicionar</Button>
                        <Button type="button" className="min-w-fit" onClick={() => form.reset()}>Reset</Button>
                        {/* 
                        O botão reset chama a função form.reset() que "reescreve" todos os valores nos inputs para os valores atuais
                        Como eles só são modificados quando criamos o useForm eles sempre são os passados no inicio, exceto linguagem que é passado depois */}
                    </Field>
                </CardFooter>

            </Card >
        </form>
    )
}